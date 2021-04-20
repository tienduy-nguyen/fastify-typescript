import { FastifyInstance, FastifyPluginCallback } from 'fastify';

export const router: FastifyPluginCallback = (fastify: FastifyInstance, opts, next) => {
  fastify.decorateRequest('user', null);
  fastify.addHook('onRequest', (req, res, next) => {});
};
