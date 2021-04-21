import { fastify } from 'fastify';
import cors from 'fastify-cors';
import helmet from 'fastify-helmet';
import rateLimit from 'fastify-rate-limit';
import { envConfig } from './common/configs/env.config';
import { router } from './routes';

const app = fastify({
  trustProxy: true,
  logger: { level: envConfig().isDev ? 'info' : 'warn' },
});

app.register(helmet);
app.register(cors, { credentials: true, origin: '*' });
app.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
});

app.get('/', (req, res) => {
  res.send({ message: 'Hi there!' });
});

app.register(router);

app.setErrorHandler((err, req, res) => {
  res.status(err.statusCode || 500);
  res.send({
    message: `Route ${req.method}:${req.url} error`,
    error: err.message || 'Internal server error',
    statusCode: err.statusCode || 500,
  });
});

export { app };
export default app;
