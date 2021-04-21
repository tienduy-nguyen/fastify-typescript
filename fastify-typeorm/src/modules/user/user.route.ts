import { RouteOptions } from 'fastify';
import { authMiddleware } from 'src/common/middlewares/auth';
import { container } from 'tsyringe';
import { UserController } from './user.controller';

type RouteConfig = Record<string, RouteOptions>;

const userController = container.resolve(UserController);

const routes: RouteConfig = {
  getUsers: {
    method: 'GET',
    url: '/users',
    preHandler: [authMiddleware],
    handler: userController.getUsers,
  },
};

export const userRoutes = Object.values(routes);
