import { injectable } from 'tsyringe';
import Pino from 'pino';

@injectable()
export class LoggerService {
  private logger: Pino.Logger;

  private readonly enable = process.env.NODE_ENV !== 'production';

  constructor() {
    this.logger = Pino({
      enabled: this.enable,
      prettyPrint: { levelFirst: true },
    });
  }

  public info(message: string, ...args: any[]) {
    this.logger.info(message, args);
  }

  public error(message: string, ...args: any[]) {
    this.logger.error(message, args);
  }

  public fatal(message: string, ...args: any[]) {
    this.logger.fatal(message, args);
  }

  public warn(message: string, ...args: any[]) {
    this.logger.warn(message, args);
  }
}
