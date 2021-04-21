import { envConfig } from './env.config';

export const sessionConfig = () => {
  const env = envConfig();
  const __prod__ = env.mode === 'production';
  return {
    secret: env.sessionSecret,
    salt: env.sessionSalt,
    cookie: {
      path: '/',
      httpOnly: true,
      secure: __prod__,
      maxAge: env.jwt.jwtRefreshExpiredTime, // 30 days --> need >= max of alive time of refresh token
      sameSite: __prod__ ? 'none' : 'lax',
    },
  };
};
