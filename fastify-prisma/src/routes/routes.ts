import { RouteOptions } from 'fastify';
import * as controllers from 'src/controllers';
import { authMiddleware } from 'src/common/middlewares/auth';

type RouteConfig = Record<string, RouteOptions>;

const routes: RouteConfig = {
  healthCheck: {
    method: 'GET',
    url: '/health',
    handler: (_, res) => {
      res.status(200).send();
    },
  },
  register: {
    method: 'POST',
    url: '/register',
    handler: controllers.register,
  },
  login: {
    method: 'POST',
    url: '/login',
    handler: controllers.login,
  },
  getAllUsers: {
    method: 'GET',
    url: '/users',
    preHandler: [authMiddleware],
    handler: controllers.getUsers,
  },
};

export const renderRoutes = Object.values(routes);
