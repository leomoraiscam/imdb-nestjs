import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { UsersRepository } from '../../../infra/typeorm/repositories/UsersRepository';
import { BCryptHashProvider } from '../../HashProvider/implementations/BCryptHashProvider.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashProvider: BCryptHashProvider,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(userEmail: string, userPassword: string): Promise<any> {
    const user = await this.usersRepository.findByEmail(userEmail);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isSamePassword = await this.hashProvider.compareHash(
      userPassword,
      user.password,
    );

    if (!isSamePassword) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
