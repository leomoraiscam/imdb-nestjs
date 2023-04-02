import { jwt } from '@/config/constants/auth.constants';
import { DATE_PROVIDER } from '@/config/constants/providers.constants';
import { USERS_TOKENS_REPOSITORY } from '@/config/constants/repositories.constants';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { verify, sign } from 'jsonwebtoken';

import { IDateProvider } from '../providers/dateProvider/models/DateProvider.interface';
import { IUsersTokensRepository } from '../repositories/UsersTokensRepository.interface';

interface IPayload {
  sub: string;
  email: string;
}

@Injectable()
export class RefreshTokenService {
  constructor(
    @Inject(USERS_TOKENS_REPOSITORY)
    private readonly usersTokensRepository: IUsersTokensRepository,
    @Inject(DATE_PROVIDER)
    private readonly dateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<{
    refreshToken: string;
  }> {
    const {
      secretRefreshToken,
      expireInRefreshToken,
      expireInRefreshTokenDays,
    } = jwt;

    const { sub, email } = verify(token, secretRefreshToken) as IPayload;

    const userId = sub;

    const usersTokens =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        userId,
        token,
      );

    if (!usersTokens) {
      throw new NotFoundException('Refresh token does not exist');
    }

    await this.usersTokensRepository.delete(usersTokens.id);

    const refreshToken = sign({ email }, secretRefreshToken, {
      subject: sub,
      expiresIn: expireInRefreshToken,
    });

    const refreshTokenExpiresDate = this.dateProvider.addDays(
      Number(expireInRefreshTokenDays),
    );

    await this.usersTokensRepository.create({
      userId: sub,
      refreshToken,
      expiresDate: refreshTokenExpiresDate,
    });

    return {
      refreshToken,
    };
  }
}
