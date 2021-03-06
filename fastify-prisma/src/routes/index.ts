import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import { renderRoutes } from './routes';

export const router: FastifyPluginCallback = (fastify: FastifyInstance, opts, next) => {
  fastify.decorateRequest('user', null);
  fastify.addHook('onRequest', (req: any, res, next) => {
    req.user = null;
    next();
  });

  for (const route of renderRoutes) {
    fastify.route(route);
  }
  next();
};
