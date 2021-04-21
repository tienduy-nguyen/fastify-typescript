import { injectable } from 'tsyringe';
import bcrypt from 'bcrypt';
import { HttpException } from 'src/common/exceptions';

@injectable()
export class PasswordService {
  public async hash(plainText: string) {
    return await bcrypt.hash(plainText, 12);
  }

  public async verify(hash: string, plain: string) {
    try {
      return await bcrypt.compare(plain, hash);
    } catch (error) {
      throw new HttpException('Error format of hash password');
    }
  }
}
