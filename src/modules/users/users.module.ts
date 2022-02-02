import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { jwt } from '../../config/auth';
import { ProfileController } from './infra/http/controllers/Profile.controller';
import { SessionController } from './infra/http/controllers/Session.controller';
import { UsersController } from './infra/http/controllers/User.controller';
import { UsersRepository } from './infra/typeorm/repositories/Users.repository';
import { AuthProviderModule } from './providers/AuthProvider/authProvider.module';
import { HashProviderModule } from './providers/HashProvider/hashProvider.module';
import { AuthenticateUserService } from './services/AuthenticateUser.service';
import { CreateUserService } from './services/CreateUser.service';
import { ShowProfileService } from './services/ShowProfile.service';
import { UpdateUserService } from './services/UpdateUser.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    HashProviderModule,
    AuthProviderModule,
    JwtModule.register({
      secret: jwt.secret,
      signOptions: { expiresIn: jwt.expiresIn },
    }),
  ],
  controllers: [UsersController, ProfileController, SessionController],
  providers: [
    CreateUserService,
    ShowProfileService,
    UpdateUserService,
    AuthenticateUserService,
  ],
})
export class UsersModule {}
