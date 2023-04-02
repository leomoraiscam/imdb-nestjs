import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateUsersTokensDTO } from '../../dtos/requests/CreateUsersTokens.dto';
import { UserToken } from '../../infra/typeorm/entities/UserToken.entity';

@Injectable()
export class InMemoryUsersTokensRepository {
  private usersTokens: UserToken[] = [];

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
}
