import { CreateUsersTokensDTO } from '../dtos/requests/CreateUsersTokens.dto';
import { UserToken } from '../infra/typeorm/entities/UserToken.entity';

export interface IUsersTokensRepository {
  findByUserId(userId: string): Promise<UserToken | undefined>;
  findByUserIdAndRefreshToken(
    userId: string,
    token: string,
  ): Promise<UserToken | undefined>;
  create(data: CreateUsersTokensDTO): Promise<UserToken>;
  delete(id: string): Promise<void>;
}
