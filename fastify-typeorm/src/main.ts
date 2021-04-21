import { app } from './app';
import { envConfig } from './common/configs/env.config';

const bootstrap = async () => {
  app.listen(envConfig().port, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
};
bootstrap();
