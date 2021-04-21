import 'jest-extended';
import { setupTest, tearDown } from './utils/prisma-test.setup';
import { prismaService } from 'src/providers/prisma.service';
import request from 'supertest';
import { app } from 'src/app';
import { hashPassword } from 'src/common/utils';

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

  describe('POST /login', () => {
    it('returns status 200 when login successfully', async () => {
      const input = { email: 'user1@yopmail.com', password: '1234567' };
      const res = await request(server).post('/login').send(input).expect(200);
      expect(res.body?.data).toBeDefined();
      const data = res.body?.data;
      expect(data).toBeDefined();
      expect(data.accessToken).toBeDefined();
      expect(data.user).toBeDefined();
      expect(data.user).toContainAllKeys(['id', 'email', 'name']);
    });

    it('return status 400 when email not match', async () => {
      const input = { email: 'user1-notexist@yopmail.com', password: '1234567' };
      const res = await request(server).post('/login').send(input).expect(400);
      expect(res.body?.error).toBeDefined();
      expect(res.body?.statusCode).toEqual(400);
      expect(res.body?.message).toBeDefined();
    });
    it('return status 400 when password not match', async () => {
      const input = { email: 'user1@yopmail.com', password: '1234567--not-match' };
      const res = await request(server).post('/login').send(input).expect(400);
      expect(res.body?.error).toBeDefined();
      expect(res.body?.statusCode).toEqual(400);
      expect(res.body?.message).toBeDefined();
    });
  });

  describe('POST /register', () => {
    it('returns status 200 when login successfully', async () => {
      const input = { email: 'user-not-exists@yopmail.com', password: '1234567' };
      const res = await request(server).post('/register').send(input).expect(200);
      expect(res.body?.data).toBeDefined();
      const data = res.body?.data;
      expect(data).toBeDefined();
      expect(data.accessToken).toBeDefined();
      expect(data.user).toBeDefined();
      expect(data.user).toContainAllKeys(['id', 'email', 'name']);
    });

    it('return status 500 when email already registered', async () => {
      const input = { email: 'user1@yopmail.com', password: '1234567' };
      const res = await request(server).post('/register').send(input).expect(500);
      expect(res.body?.error).toBeDefined();
      expect(res.body?.statusCode).toEqual(500);
      expect(res.body?.message).toBeDefined();
    });
  });
});
