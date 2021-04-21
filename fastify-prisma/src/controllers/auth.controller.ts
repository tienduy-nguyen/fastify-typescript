import { RouteHandlerMethod } from 'fastify';
import { BadRequestException, HttpException } from 'src/common/exceptions';
import { PayloadUserForJwtToken } from 'src/common/types';
import { hashPassword, signToken, verifyPassword } from 'src/common/utils';
import { prismaService } from 'src/providers/prisma.service';

export const register: RouteHandlerMethod = async (req, res) => {
  try {
    const { name, email, password } = req.body as any;
    const hashed = await hashPassword(password);
    const user = await prismaService.user.create({
      data: { name, email, password: hashed },
    });
    const { password: pass, ...rest } = user;
    const payload: PayloadUserForJwtToken = {
      user: rest,
    };
    res.send({ data: { user: rest, accessToken: signToken(payload) } });
  } catch (error) {
    throw new HttpException(error.message);
  }
};

export const login: RouteHandlerMethod = async (req, res) => {
  try {
    const { email, password } = req.body as any;
    const user = await prismaService.user.findUnique({ where: { email } });
    if (!user) throw new BadRequestException('Invalid credentials');
    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) throw new BadRequestException('Invalid credentials');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...rest } = user;
    const payload: PayloadUserForJwtToken = {
      user: rest,
    };
    res.send({ data: { user: rest, accessToken: signToken(payload) } });
  } catch (error) {
    if (error.statusCode == '400') throw error;
    throw new HttpException(error.message);
  }
};
