import { jwt } from '@/config/constants/auth.constants';
import {
  DATE_PROVIDER,
  HASH_PROVIDER,
} from '@/config/constants/providers.constants';
import {
  USERS_REPOSITORY,
  USERS_TOKENS_REPOSITORY,
} from '@/config/constants/repositories.constants';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import { AuthenticateUsersDTO } from '../dtos/requests/AuthenticateUsers.dto';
import { AuthenticatedUserDTO } from '../dtos/responses/AuthenticatedUser.dto';
import { IDateProvider } from '../providers/dateProvider/models/DateProvider.interface';
import { IHashProvider } from '../providers/hashProvider/models/HashProvider.interface';
import { IUsersRepository } from '../repositories/UsersRepository.interface';
import { IUsersTokensRepository } from '../repositories/UsersTokensRepository.interface';

@Injectable()
export class AuthenticateUserService {
  constructor(
    @Inject(HASH_PROVIDER)
    private readonly hashProvider: IHashProvider,
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
    @Inject(USERS_TOKENS_REPOSITORY)
    private readonly usersTokensRepository: IUsersTokensRepository,
    @Inject(DATE_PROVIDER)
    private readonly dateProvider: IDateProvider,
  ) {}

  public async execute({
    email,
    password,
  }: AuthenticateUsersDTO): Promise<AuthenticatedUserDTO> {
    const {
      secret,
      expiresIn,
      secretRefreshToken,
      expireInRefreshToken,
      expireInRefreshTokenDays,
    } = jwt;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('email/password incorrect');
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('email/password incorrect');
    }

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn,
    });

    const refreshToken = sign({ email }, secretRefreshToken, {
      subject: user.id,
      expiresIn: expireInRefreshToken,
    });

    const refreshTokenExpiresDate = this.dateProvider.addDays(
      Number(expireInRefreshTokenDays),
    );

    await this.usersTokensRepository.create({
      userId: user.id,
      refreshToken,
      expiresDate: refreshTokenExpiresDate,
    });

    return { user, token, refreshToken };
  }
}
