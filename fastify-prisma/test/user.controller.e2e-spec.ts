import 'jest-extended';
import { setupTest, tearDown } from './utils/prisma-test.setup';
import { prismaService } from 'src/providers/prisma.service';
import request from 'supertest';
import { app } from 'src/app';
import { hashPassword, signToken } from 'src/common/utils';

let server;
describe('auth controller', () => {
  beforeAll(async () => {
    setupTest();
    await app.ready();
    server = app.server;
    await prismaService.user.upsert({
      where: { email: 'user1@yopmail.com' },
      create: {
        name: 'user1',
        email: 'user1@yopmail.com',
        password: await hashPassword('1234567'),
      },
      update: {},
    });
    try {
      await prismaService.user.delete({
        where: { email: 'user-not-exists@yopmail.com' },
      });
    } catch (error) {}
  });
  afterAll(async () => {
    app.close();
    await tearDown();
  });

  describe('GET /login', () => {
    it('returns status 200 when already authenticate ', async () => {
      const res = await request(server)
        .get('/users')
        .set('Authorization', `Bearer ${signToken({ user: { email: 'user1@yopmail.com' } })}`)
        .expect(200);
      expect(res.body?.data).toBeDefined();
      const data = res.body?.data;
      expect(data).toBeDefined();
      expect(data.users).toBeArray();
      expect(data.users.length).toBeGreaterThan(0);
      data.users.forEach((user) => {
        expect(user).toContainAllKeys(['id', 'email', 'name']);
      });
    });

    it('return status 401 when not authenticated', async () => {
      const res = await request(server).get('/users').expect(401);
      expect(res.body?.error).toEqual('Unauthorized');
      expect(res.body?.statusCode).toEqual(401);
      expect(res.body?.message).toBeDefined();
    });
    it('return status 401 when attacker using fake token', async () => {
      const res = await request(server)
        .get('/users')
        .set('Authorization', `Bearer ${signToken({ user: { email: 'user-not-exists@yopmail.com' } })}`)
        .expect(401);
      expect(res.body?.error).toBeDefined();
      expect(res.body?.statusCode).toEqual(401);
      expect(res.body?.message).toBeDefined();
    });
  });
});
