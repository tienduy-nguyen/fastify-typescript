import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { envConfig } from 'src/common/configs/env.config';
import { BadRequestException } from '../exceptions';
import { DataStoredFromToken } from '../types';

export const prismaService = new PrismaClient();

export const hashPassword = (plain: string): Promise<string> => {
  return hash(plain, 12);
};

export const verifyPassword = (plain: string, encrypted: string): Promise<boolean> => {
  return compare(plain, encrypted);
};

export const signToken = (payload: any): string => {
  const token = jwt.sign(payload, envConfig().jwtSecret, { expiresIn: 60 * 60 * 2 });
  return token;
};

export const verifyToken = (token: string): DataStoredFromToken => {
  try {
    const decoded = jwt.verify(token, envConfig().jwtSecret);
    return decoded as DataStoredFromToken;
  } catch (error) {
    throw new BadRequestException('Token missing or invalid');
  }
};
