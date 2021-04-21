export const envConfig = () => {
  return {
    port: process.env.SERVER_PORT || 5002,
    serverHost: process.env.HOST || 'http://localhost',
    clientUrl: process.env.CLIENT_URL || 'http://localhost:3000/',
    isDev: process.env.NODE_ENV === 'development',
    jwt: {
      jwtSecret: process.env.JWT_SECRET || `some-very-strong-secret`,
      jwtExpiredTime: parseInt(process.env.JWT_EXPIRED_TIME) || 7200,
      jwtRefreshExpiredTime: parseInt(process.env.JWT_REFRESH_EXPIRED_TIME) || 2592000,
    },
    mode: process.env.NODE_ENV,
    sessionSecret: process.env.SESSION_SECRET || `averylogphrasebiggerthanthirtytwochars`,
    sessionSalt: process.env.SESSION_SALT || 'mq9hDxBVDbspDR6n',
    cookieSecret: process.env.COOKIE_SECRET || `some-very-strong-secret`,
  };
};
