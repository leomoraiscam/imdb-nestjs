import { IUsersRepository } from '@/modules/users/repositories/UsersRepository.interface';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { BCryptHashProvider } from '../../hashProvider/implementations/BCryptHash.provider';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: IUsersRepository,
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
