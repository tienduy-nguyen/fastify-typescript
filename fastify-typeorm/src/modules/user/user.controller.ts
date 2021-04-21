import { injectable } from 'tsyringe';
import { getConnection, Repository } from 'typeorm';
import { User } from './user.model';

@injectable()
export class UserController {
  private userRepository: Repository<User>;

  public async getUsers(req, res) {
    const connection = getConnection();
    this.userRepository = connection.getRepository(User);
    return await this.userRepository.find();
  }
}
