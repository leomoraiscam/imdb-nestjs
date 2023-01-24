import { HASH_PROVIDER } from '@/config/constants/providers.constants';
import { USERS_REPOSITORY } from '@/config/constants/repositories.constants';
import { BCryptHashProvider } from '@/modules/users/providers/hashProvider/implementations/BCryptHash.provider';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../../infra/typeorm/entities/User.entity';
import { UsersRepository } from '../../infra/typeorm/repositories/Users.repository';
import { HashProviderModule } from '../hashProvider/hashProvider.module';
import { JwtStrategy } from './implementations/JwtStrategy.provider';
import { LocalStrategy } from './implementations/LocalStrategy.provider';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HashProviderModule],
  providers: [
    {
      provide: USERS_REPOSITORY,
      useClass: UsersRepository,
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
