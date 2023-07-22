import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { promisify } from 'util';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { jwtPayloadType } from './types/jwtPayload.type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUserOrCreateIfDoesNotExist(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const result = await promisify(crypto.pbkdf2)(
        password,
        user.salt,
        1000,
        64,
        'sha512',
      );
      if (user.password === result.toString('hex')) {
        return user;
      }
      return null;
    }
    // create new user if not exist
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = await promisify(crypto.pbkdf2)(
      password,
      salt,
      1000,
      64,
      'sha512',
    );
    const newUser = await this.usersService.create(
      email,
      hash.toString('hex'),
      salt,
    );
    return newUser;
  }

  async getAccessTokenForUser(
    user: UserEntity,
  ): Promise<{ accessToken: string }> {
    const payload: jwtPayloadType = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
