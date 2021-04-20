export const envConfig = () => {
  return {
    port: process.env.SERVER_PORT || 5002,
    serverHost: process.env.HOST || 'http://localhost',
    clientUrl: process.env.CLIENT_URL || 'http://localhost:3000/',
    isDev: process.env.NODE_ENV === 'development',
    jwtSecret: process.env.JWT_SECRET || 'some-secrete',
  };
};
