import { RouteHandlerMethod } from 'fastify';
import { HttpException } from 'src/common/exceptions';
import { prismaService } from 'src/providers/prisma.service';

export const getUsers: RouteHandlerMethod = async (req, res) => {
  try {
    const users = await prismaService.user.findMany({ select: { id: true, name: true, email: true } });
    res.send({ data: { users } });
  } catch (error) {
    throw new HttpException(error.message);
  }
};
