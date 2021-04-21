import { RouteOptions } from 'fastify';
import { container } from 'tsyringe';
import { AuthController } from './auth.controller';

type RouteConfig = Record<string, RouteOptions>;

const authController = container.resolve(AuthController);

const routes: RouteConfig = {
  register: {
    method: 'POST',
    url: '/auth/register',
    handler: authController.register,
  },
  login: {
    method: 'POST',
    url: '/auth/login',
    handler: authController.login,
  },
};

export const authRoutes = Object.values(routes);
