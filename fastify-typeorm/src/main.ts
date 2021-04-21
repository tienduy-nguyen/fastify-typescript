import 'reflect-metadata';
import { container } from 'tsyringe';
import { Connection } from 'typeorm';
import { app } from './app';
import { envConfig } from './common/configs/env.config';
import { DbService } from './providers/db.service';
import { LoggerService } from './providers/logger.service';

let connection: Connection;
const logger = container.resolve(LoggerService);
const bootstrap = async () => {
  const dbService = container.resolve(DbService);

  connection = await dbService.initDB();
  app.listen(envConfig().port, (err, address) => {
    if (err) {
      logger.error(err.message);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
};

bootstrap().catch(async (err) => {
  logger.error(err.message);
  await connection.close();
});
