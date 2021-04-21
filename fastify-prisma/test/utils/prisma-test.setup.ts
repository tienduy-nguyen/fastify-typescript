// import { PrismaClient } from '@prisma/client';
import { prismaService } from 'src/providers/prisma.service';

export function setupTest(): void {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error(`You are trying to run tests related to database on ${process.env.NODE_ENV}`);
  }

  // Let npm 'pretest' in charge of the database setup.
}

export async function tearDown(): Promise<void> {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error(`You are trying to run tests related to database on ${process.env.NODE_ENV}`);
  }

  // eslint-disable-next-line global-require
  // const prisma: PrismaClient = require('src/providers/prisma.service').default;
  await prismaService.$disconnect();
}
