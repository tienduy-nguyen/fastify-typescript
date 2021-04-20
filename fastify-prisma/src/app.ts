import { fastify } from 'fastify';
import cors from 'fastify-cors';
import helmet from 'fastify-helmet';
import rateLimit from 'fastify-rate-limit';
import { envConfig } from './common/configs/env.config';

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

app.setErrorHandler((err, req, res) => {
  res.status(err.statusCode || 500);
  res.send({ error: { message: err.message || 'Internal server error' } });
});

export { app };
