import { PayloadUserForJwtToken } from 'src/common/types';
import { container, injectable } from 'tsyringe';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto';
import { JwtService } from './jwt.service';

@injectable()
export class AuthController {
  public path = '/auth';
  constructor(private authService: AuthService, private jwtService: JwtService) {}

  public async login(req, res) {
    if (!this.authService) this.authService = container.resolve(AuthService);
    if (!this.jwtService) this.jwtService = container.resolve(JwtService);
    const input = req.body as LoginUserDto;

    const user = await this.authService.login(input);
    const payload: PayloadUserForJwtToken = {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    };
    const token = this.jwtService.sign(payload);
    req.session.set('accessToken', token);
    res.send({ user, accessToken: token });
  }

  public async register(req, res) {
    const input = req.body as LoginUserDto;
    const user = await this.authService.login(input);

    res.send(user);
  }
}
