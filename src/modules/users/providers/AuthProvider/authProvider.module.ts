import { HASH_PROVIDER } from '@/config/constants/providers.constants';
import {
  USERS_REPOSITORY,
  USERS_TOKENS_REPOSITORY,
} from '@/config/constants/repositories.constants';
import { BCryptHashProvider } from '@/modules/users/providers/hashProvider/implementations/BCryptHash.provider';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../../infra/typeorm/entities/User.entity';
import { UserToken } from '../../infra/typeorm/entities/UserToken.entity';
import { UsersRepository } from '../../infra/typeorm/repositories/Users.repository';
import { UsersTokensRepository } from '../../infra/typeorm/repositories/UsersTokens.repository';
import { HashProviderModule } from '../hashProvider/hashProvider.module';
import { JwtStrategy } from './implementations/JwtStrategy.provider';
import { LocalStrategy } from './implementations/LocalStrategy.provider';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserToken]), HashProviderModule],
  providers: [
    {
      provide: USERS_REPOSITORY,
      useClass: UsersRepository,
    },
    {
      provide: USERS_TOKENS_REPOSITORY,
      useClass: UsersTokensRepository,
    },
    {
      provide: HASH_PROVIDER,
      useClass: BCryptHashProvider,
    },
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthProviderModule {}
