import {
  DATE_PROVIDER,
  HASH_PROVIDER,
} from '@/config/constants/providers.constants';
import {
  USERS_REPOSITORY,
  USERS_TOKENS_REPOSITORY,
} from '@/config/constants/repositories.constants';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { ResetPasswordUserDTO } from '../dtos/requests/ResetPasswordUser.dto';
import { IDateProvider } from '../providers/dateProvider/models/DateProvider.interface';
import { IHashProvider } from '../providers/hashProvider/models/HashProvider.interface';
import { IUsersRepository } from '../repositories/UsersRepository.interface';
import { IUsersTokensRepository } from '../repositories/UsersTokensRepository.interface';

@Injectable()
export class ResetPasswordUserService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
    @Inject(USERS_TOKENS_REPOSITORY)
    private readonly usersTokensRepository: IUsersTokensRepository,
    @Inject(DATE_PROVIDER)
    private readonly dateProvider: IDateProvider,
    @Inject(HASH_PROVIDER)
    private readonly hashProvider: IHashProvider,
  ) {}

  async execute({ password, token }: ResetPasswordUserDTO): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token,
    );

    if (!userToken) {
      throw new UnauthorizedException('Invalid Token');
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expiresDate,
        this.dateProvider.dateNow(),
      )
    ) {
      throw new UnauthorizedException('Token expired!');
    }

    const user = await this.usersRepository.findById(userToken.userId);

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);

    await this.usersTokensRepository.delete(userToken.id);
  }
}
