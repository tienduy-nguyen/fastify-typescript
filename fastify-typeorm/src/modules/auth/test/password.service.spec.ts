import { container } from 'tsyringe';
import bcrypt from 'bcrypt';
import { PasswordService } from '../password.service';

describe('PasswordService', () => {
  let passwordService: PasswordService;
  beforeEach(() => {
    passwordService = container.resolve(PasswordService);
  });
  it('Should be defined', () => {
    expect(passwordService).toBeDefined();
  });
  describe('hash', () => {
    it('Should return a string hash', async () => {
      const plain = '1234567';
      const hash = await passwordService.hash(plain);
      expect(hash).toBeDefined();
      const match = await bcrypt.compare(plain, hash);
      expect(match).toBe(true);
    });
  });

  describe('verify', () => {
    it('Should match password', async () => {
      const plain = '1234567';
      const hash = await bcrypt.hash(plain, 12);
      const match = await passwordService.verify(hash, plain);
      expect(match).toBe(true);
    });
  });
});
