import { onRequestHookHandler } from 'fastify';
import { UnAuthorizedException } from '../exceptions/unauthorized.exception.ts';
import { verifyToken } from '../utils';

export const authMiddleware: onRequestHookHandler = async (req: any, res) => {
  try {
    const auth = req.headers['authorization'];
    const token = auth?.replace('Bearer ', '');
    const { user } = verifyToken(token);
    if (!user) throw new UnAuthorizedException();
    req.user = user;
  } catch (error) {
    throw new UnAuthorizedException();
  }
};
