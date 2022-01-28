import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { jwt } from '../../config/auth';
import { ProfileController } from './infra/http/controllers/profile.controller';
import { SessionController } from './infra/http/controllers/session.controller';
import { UsersController } from './infra/http/controllers/users.controller';
import { UsersRepository } from './infra/typeorm/repositories/UsersRepository';
import { AuthProviderModule } from './providers/AuthProvider/authProvider.module';
import { HashProviderModule } from './providers/HashProvider/hashProvider.module';
import { AuthenticateUserService } from './services/AuthenticateUserService.service';
import { CreateUserService } from './services/CreateUserService.service';
import { ShowProfileService } from './services/ShowProfileService.service';
import { UpdateUserService } from './services/UpdateUserService.service';

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
