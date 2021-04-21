import 'fastify';

declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    SERVER_PORT?: string;
    SERVER_HOST?: string;
    CLIENT_URL?: string;
    JWT_SECRET?: string;
  }
}
declare module 'fastify' {
  export interface FastifyRequest {
    user: any;
  }
}
