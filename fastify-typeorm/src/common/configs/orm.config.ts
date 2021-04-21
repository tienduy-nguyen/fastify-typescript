import { join } from 'path';
import dotenv from 'dotenv';

export function ormConfig(): any {
  const envMode = process.env.NODE_ENV || 'development';
  switch (envMode) {
    case 'development':
      return configForDevelopment();
    case 'test':
      return configForTesting();
    case 'production':
      return configForProduction();
    default:
      return configForDevelopment();
  }
}

const configForTesting = () => {
  dotenv.config();
  return {
    type: 'sqlite',
    database: 'src/common/databases/test.db',
    entities: [join(__dirname, '**', '*.model.{ts,js}')],
    synchronize: true,
  };
};
const configForDevelopment = () => {
  dotenv.config();
  return {
    type: process.env.DB_CONNECTOR,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    autoLoadEntities: true,
    entities: [join(__dirname, '**', '*.model.{ts,js}')],
    logging: false,
    synchronize: true,
  };
};
const configForProduction = () => {
  dotenv.config({ path: '.env.production' });
  return {
    type: process.env.DB_CONNECTOR,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    autoLoadEntities: true,
    entities: [join(__dirname, '**', '*.model.{ts,js}')],
    logging: false,
    synchronize: true,
  };
};
