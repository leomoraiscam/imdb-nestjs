import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersRepository } from '../../infra/typeorm/repositories/Users.repository';
import { HashProviderModule } from '../HashProvider/hashProvider.module';
import { JwtStrategy } from './implementations/JwtStrategy.provider';
import { LocalStrategy } from './implementations/LocalStrategy.provider';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository]), HashProviderModule],
  providers: [LocalStrategy, JwtStrategy],
})
export class AuthProviderModule {}
