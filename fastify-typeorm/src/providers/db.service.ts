import { ormConfig } from 'src/common/configs/orm.config';
import { createConnection, Connection, getConnection } from 'typeorm';
import { injectable } from 'tsyringe';
import { LoggerService } from './logger.service';

@injectable()
export class DbService {
  private _connection: Connection;
  constructor(private logger: LoggerService) {}
  public async getDbConnection() {
    if (!getConnection()) {
      await createConnection(ormConfig());
      this._connection = getConnection();
    }
    return this._connection;
  }
  public async initDB() {
    this._connection = await createConnection(ormConfig());
    this.logger.info('Database connected!');
    return this._connection;
  }
}
