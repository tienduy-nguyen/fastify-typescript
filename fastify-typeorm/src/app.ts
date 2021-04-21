import { fastify, FastifyInstance } from 'fastify';
import cors from 'fastify-cors';
import helmet from 'fastify-helmet';
import rateLimit from 'fastify-rate-limit';
import { envConfig } from './common/configs/env.config';
import secureSession from 'fastify-secure-session';
import { appRouter } from './app.route';
import fastifyExpress from 'fastify-express';

let app: FastifyInstance;

export async function buildServer() {
  const env = envConfig();
  const __prod__ = env.mode === 'production';
  app = fastify({
    trustProxy: true,
    logger: { level: envConfig().isDev ? 'info' : 'warn' },
  });
  await app.register(fastifyExpress);
  app.register(helmet);
  app.register(cors, { credentials: true, origin: '*' });
  app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  app.register(secureSession, {
    cookieName: 'SESSION_AUTH',
    secret: env.sessionSecret,
    salt: env.sessionSalt,
    cookie: {
      path: '/',
      httpOnly: true,
      secure: __prod__,
      maxAge: env.jwt.jwtRefreshExpiredTime, // 30 days --> need >= max of alive time of refresh token
      sameSite: __prod__ ? 'none' : 'lax',
    },
  });

  app.get('/', (req, res) => {
    res.send({ message: 'Hi there!' });
  });
  app.get('/health', (req, res) => {
    res.status(200).send();
  });

  app.register(appRouter);

  app.setErrorHandler((err, req, res) => {
    res.status(err.statusCode || 500);
    res.send({
      message: `Route ${req.method}:${req.url} error`,
      error: err.message || 'Internal server error',
      statusCode: err.statusCode || 500,
    });
  });
  return app;
}
buildServer();
export { app };
export default app;
