import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersRepository } from '../../infra/typeorm/repositories/UsersRepository';
import { HashProviderModule } from '../HashProvider/hashProvider.module';
import { JwtStrategy } from './implementations/jwt.strategy';
import { LocalStrategy } from './implementations/local.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository]), HashProviderModule],
  providers: [LocalStrategy, JwtStrategy],
})
export class AuthProviderModule {}
