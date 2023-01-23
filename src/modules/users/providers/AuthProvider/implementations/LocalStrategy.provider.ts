import { HASH_PROVIDER } from '@/config/constants/providers.constants';
import { USERS_REPOSITORY } from '@/config/constants/repositories.constants';
import { IUsersRepository } from '@/modules/users/repositories/UsersRepository.interface';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { IHashProvider } from '../../hashProvider/models/HashProvider.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
    @Inject(HASH_PROVIDER)
    private readonly hashProvider: IHashProvider,
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
