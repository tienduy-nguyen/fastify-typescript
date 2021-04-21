import { injectable } from 'tsyringe';
import jwt from 'jsonwebtoken';
import { BadRequestException } from 'src/common/exceptions';
import { DataStoredFromToken, PayloadUserForJwtToken } from 'src/common/types';
import { envConfig } from 'src/common/configs/env.config';

@injectable()
export class JwtService {
  private jwtEnv = envConfig().jwt;

  public sign(payload: PayloadUserForJwtToken, isRefreshToken = false) {
    let token: string;
    if (!isRefreshToken) {
      token = jwt.sign(payload, this.jwtEnv.jwtSecret, {
        expiresIn: this.jwtEnv.jwtExpiredTime,
      });
    } else {
      token = jwt.sign(payload, this.jwtEnv.jwtSecret, {
        expiresIn: this.jwtEnv.jwtRefreshExpiredTime,
      });
    }
    return token;
  }

  public verify(token: string): DataStoredFromToken {
    try {
      const decoded = jwt.verify(token, this.jwtEnv.jwtSecret);
      return decoded as DataStoredFromToken;
    } catch (error) {
      throw new BadRequestException('Token invalid or missing');
    }
  }
}
