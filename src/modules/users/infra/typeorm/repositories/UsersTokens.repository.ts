import { IUsersTokensRepository } from '@/modules/users/repositories/UsersTokensRepository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUsersTokensDTO } from '../../../dtos/requests/CreateUsersTokens.dto';
import { UserToken } from '../entities/UserToken.entity';

@Injectable()
export class UsersTokensRepository implements IUsersTokensRepository {
  constructor(
    @InjectRepository(UserToken)
    private repository: Repository<UserToken>,
  ) {}

  async findByUserId(userId: string): Promise<UserToken> {
    const usersTokens = await this.repository.findOne({
      where: {
        userId,
      },
      relations: ['user', 'user.roles', 'user.permissions'],
    });

    return usersTokens;
  }

  async findByRefreshToken(token: string): Promise<UserToken> {
    const usersTokens = await this.repository.findOne({
      where: {
        refreshToken: token,
      },
      relations: ['user', 'user.roles', 'user.permissions'],
    });

    return usersTokens;
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    token: string,
  ): Promise<UserToken> {
    const usersTokens = await this.repository.findOne({
      where: {
        userId,
        refreshToken: token,
      },
    });

    return usersTokens;
  }

  public async create({
    expiresDate,
    refreshToken,
    userId,
  }: CreateUsersTokensDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      expiresDate,
      refreshToken,
      userId,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
