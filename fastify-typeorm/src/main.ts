import 'reflect-metadata';
import { container } from 'tsyringe';
import { Connection } from 'typeorm';
import { envConfig } from './common/configs/env.config';
import { DbService } from './providers/db.service';
import { LoggerService } from './providers/logger.service';
import { app } from './app';

let connection: Connection;
const logger = container.resolve(LoggerService);

const bootstrap = async () => {
  const dbService = container.resolve(DbService);

  connection = await dbService.initDB();
  container.register<Connection>('Connection', { useValue: connection });

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
