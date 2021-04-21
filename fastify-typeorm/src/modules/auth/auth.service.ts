import { container, injectable, singleton } from 'tsyringe';
import { PasswordService } from './password.service';
import { LoginUserDto, RegisterUserDto } from './dto';
import { BadRequestException, ConflictException } from 'src/common/exceptions';
import { User } from '../user/user.model';
import { emailRegex } from 'src/common/utils';
import { getConnection, Repository } from 'typeorm';

@injectable()
export class AuthService {
  private userRepository: Repository<User>;
  constructor(private passwordService: PasswordService) {}

  public async register(input: RegisterUserDto): Promise<User> {
    if (!this.passwordService) this.passwordService = container.resolve(PasswordService);
    const userCheck = await this.userRepository.findOne({ where: { email: input.email } });
    if (userCheck) throw new ConflictException(`User with email ${input.email} already exists!`);
    const hashed = await this.passwordService.hash(input.password);
    const user = this.userRepository.create({ ...input, password: hashed });
    await this.userRepository.save(user);
    return user;
  }

  public async login(input: LoginUserDto): Promise<User> {
    if (!this.userRepository) {
      const connection = await getConnection();
      this.userRepository = connection.getRepository(User);
    }
    if (!this.passwordService) this.passwordService = container.resolve(PasswordService);
    const { usernameOrEmail, password } = input;
    const isEmail = emailRegex.test(usernameOrEmail);
    let user: User;
    if (isEmail) {
      user = await this.userRepository.findOne({ where: { email: usernameOrEmail } });
    } else {
      user = await this.userRepository.findOne({ where: { username: usernameOrEmail } });
    }
    if (!user) throw new BadRequestException('Invalid credentials!');
    const isMatch = await this.passwordService.verify(user.password, password);
    if (!isMatch) throw new BadRequestException('Invalid credentials!');
    return user;
  }
}
