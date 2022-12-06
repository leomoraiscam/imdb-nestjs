import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { jwt } from '../../config/auth';
import { AuthenticatedUserController } from './infra/http/controllers/AuthenticatedUser.controller';
import { CreateUsersController } from './infra/http/controllers/CreateUser.controller';
import { ShowProfileUserController } from './infra/http/controllers/ShowProfileUser.controller';
import { UpdateProfileUserController } from './infra/http/controllers/UpdateProfileUser.controller';
import { User } from './infra/typeorm/entities/User.entity';
import { UsersRepository } from './infra/typeorm/repositories/Users.repository';
import { AuthProviderModule } from './providers/AuthProvider/authProvider.module';
import { HashProviderModule } from './providers/HashProvider/hashProvider.module';
import { BCryptHashProvider } from './providers/HashProvider/implementations/BCryptHash.provider';
import { AuthenticateUserService } from './services/AuthenticateUser.service';
import { CreateUserService } from './services/CreateUser.service';
import { ShowProfileUserService } from './services/ShowProfileUser.service';
import { UpdateUserService } from './services/UpdateUser.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    HashProviderModule,
    AuthProviderModule,
    JwtModule.register({
      secret: jwt.secret,
      signOptions: { expiresIn: jwt.expiresIn },
    }),
  ],
  controllers: [
    CreateUsersController,
    ShowProfileUserController,
    AuthenticatedUserController,
    UpdateProfileUserController,
  ],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useClass: UsersRepository,
    },
    {
      provide: 'HASH_PROVIDER',
      useClass: BCryptHashProvider,
    },
    CreateUserService,
    ShowProfileUserService,
    UpdateUserService,
    AuthenticateUserService,
  ],
})
export class UsersModule {}
