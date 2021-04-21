import { onRequestHookHandler } from 'fastify';
import { prismaService } from 'src/providers/prisma.service';
import { UnAuthorizedException } from '../exceptions/unauthorized.exception.ts';
import { verifyToken } from '../utils';

export const authMiddleware: onRequestHookHandler = async (req: any, res) => {
  try {
    const auth = req.headers['authorization'];
    const token = auth?.replace('Bearer ', '');
    const { user } = verifyToken(token);
    if (!user) throw new UnAuthorizedException();

    // check user in database
    const realUser = await prismaService.user.findUnique({ where: { email: user.email } });
    if (!realUser) throw new UnAuthorizedException();
    req.user = user;
  } catch (error) {
    throw new UnAuthorizedException();
  }
};
