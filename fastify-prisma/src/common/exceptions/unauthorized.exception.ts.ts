import { HttpException } from './http.exception';

export class UnAuthorizedException extends HttpException {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}
