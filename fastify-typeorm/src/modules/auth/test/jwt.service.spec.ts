import { PayloadUserForJwtToken } from 'src/common/types';
import { container } from 'tsyringe';
import { JwtService } from '../jwt.service';

describe('JwtService', () => {
  let jwtService: JwtService;
  beforeAll(() => {
    jwtService = container.resolve(JwtService);
  });
  it('Should be defined', () => {
    expect(jwtService).toBeDefined();
  });
  describe('sign', () => {
    it('Should return a string token', async () => {
      const payload: PayloadUserForJwtToken = { user: { id: 'some_id' } };
      const { token } = jwtService.sign(payload);
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });
  });

  describe('verify', () => {
    it('Should return data from token', async () => {
      const payload: PayloadUserForJwtToken = { user: { id: 'some_id' } };
      const { token } = await jwtService.sign(payload);
      const { user } = jwtService.verify(token);
      expect(user.id).toEqual('some_id');
    });
  });
});
