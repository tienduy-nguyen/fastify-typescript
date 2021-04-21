import fastify from 'fastify';
import { envConfig } from './common/configs/env.config';

const app = fastify({
  logger: envConfig().isDev ? 'info' : 'warn',
});
