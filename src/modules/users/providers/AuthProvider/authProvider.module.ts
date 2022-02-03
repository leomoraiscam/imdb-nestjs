import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../../infra/typeorm/entities/User.entity';
import { UsersRepository } from '../../infra/typeorm/repositories/Users.repository';
import { HashProviderModule } from '../HashProvider/hashProvider.module';
import { JwtStrategy } from './implementations/JwtStrategy.provider';
import { LocalStrategy } from './implementations/LocalStrategy.provider';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HashProviderModule],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useClass: UsersRepository,
    },
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthProviderModule {}
