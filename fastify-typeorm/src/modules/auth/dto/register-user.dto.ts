import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  password: string;
}
