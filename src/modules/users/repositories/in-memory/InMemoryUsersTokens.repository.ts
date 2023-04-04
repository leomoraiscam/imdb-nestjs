import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateUsersTokensDTO } from '../../dtos/requests/CreateUsersTokens.dto';
import { UserToken } from '../../infra/typeorm/entities/UserToken.entity';
import { IUsersTokensRepository } from '../UsersTokensRepository.interface';

@Injectable()
export class InMemoryUsersTokensRepository implements IUsersTokensRepository {
  private usersTokens: UserToken[] = [];

  async findByUserId(userId: string): Promise<UserToken> {
    const userToken = this.usersTokens.find(
      (userToken) => userToken.userId === userId,
    );

    return userToken;
  }

  async findByRefreshToken(token: string): Promise<UserToken> {
    const userToken = this.usersTokens.find(
      (userToken) => userToken.refreshToken === token,
    );

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    token: string,
  ): Promise<UserToken> {
    const userToken = this.usersTokens.find(
      (userToken) =>
        userToken.userId === userId && userToken.refreshToken === token,
    );

    return userToken;
  }

  public async create({
    expiresDate,
    refreshToken,
    userId,
  }: CreateUsersTokensDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, { id: uuid() }, expiresDate, refreshToken, userId);

    this.usersTokens.push(userToken);

    return userToken;
  }

  async delete(id: string): Promise<void> {
    const fieldIndex = this.usersTokens.findIndex(
      (userToken) => userToken.id === id,
    );

    this.usersTokens.splice(fieldIndex, 1);
  }
}
