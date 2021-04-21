import { onRequestHookHandler } from 'fastify';
import { User } from 'src/modules/user/user.model';
import { UnAuthorizedException } from '../exceptions/unauthorized.exception.ts';
import { verifyToken } from '../utils';

export const authMiddleware: onRequestHookHandler = async (req: any, res) => {
  try {
    const token = req.session.get('accessToken');
    if (!token) throw new UnAuthorizedException();

    const { user } = verifyToken(token);
    if (!user) throw new UnAuthorizedException();

    // check user in database
    const realUser = await User.findOne({ where: { email: user.email } });
    if (!realUser) throw new UnAuthorizedException();
    req.user = user;
  } catch (error) {
    throw new UnAuthorizedException();
  }
};
