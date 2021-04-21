import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import { authRoutes } from './modules/auth/auth.route';
import { userRoutes } from './modules/user/user.route';

export const appRouter: FastifyPluginCallback = (fastify: FastifyInstance, opts, next) => {
  fastify.decorateRequest('user', null);
  fastify.addHook('onRequest', (req: any, res, next) => {
    req.user = null;
    next();
  });

  const allRoutes = [...authRoutes, ...userRoutes];

  for (const route of allRoutes) {
    fastify.route(route);
  }

  next();
};
