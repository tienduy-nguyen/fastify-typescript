import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.user.upsert({
    where: { email: 'user1@yopmail.com' },
    create: {
      name: 'user1',
      email: 'user1@yopmail.com',
      password: await bcrypt.hash('1234567', 12),
    },
    update: {},
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
