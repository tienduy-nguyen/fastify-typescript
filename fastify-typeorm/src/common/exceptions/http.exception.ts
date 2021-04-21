export class HttpException extends Error {
  public statusCode: number;
  public message: string;

  constructor(message = 'Internal server error', statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}
