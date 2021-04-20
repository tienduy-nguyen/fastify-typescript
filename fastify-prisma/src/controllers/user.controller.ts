import { RouteHandlerMethod } from 'fastify';
import { HttpException } from 'src/common/exceptions';
import { prismaService } from 'src/common/utils';

export const getUsers: RouteHandlerMethod = async (req, res) => {
  try {
    const users = await prismaService.user.findMany({ select: { name: true, email: true } });
    res.send({ data: { users } });
  } catch (error) {
    throw new HttpException(error.message);
  }
};
