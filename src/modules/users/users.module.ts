import {
  DATE_PROVIDER,
  ETHEREAL_MAIL_PROVIDER,
  HASH_PROVIDER,
  MAIL_TEMPLATE_PROVIDER,
} from '@/config/constants/providers.constants';
import {
  USERS_REPOSITORY,
  USERS_TOKENS_REPOSITORY,
} from '@/config/constants/repositories.constants';
import EtherealMailProvider from '@/shared/providers/MailerProvider/implementations/ethereal.provider';
import { HandlebarMailTemplateProvider } from '@/shared/providers/MailTemplateProvider/implementations/handlebarsMailTemplate.provider';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { jwt } from '../../config/constants/auth.constants';
import { AuthenticatedUserController } from './infra/http/controllers/AuthenticatedUser.controller';
import { CreateUsersController } from './infra/http/controllers/CreateUser.controller';
import { RefreshTokenController } from './infra/http/controllers/RefreshToken.controller';
import { ResetPasswordUserController } from './infra/http/controllers/ResetPasswordUser.controller';
import { SendForgotPasswordMailController } from './infra/http/controllers/SendForgotPasswordMail.controller';
import { ShowProfileUserController } from './infra/http/controllers/ShowProfileUser.controller';
import { UpdateProfileUserController } from './infra/http/controllers/UpdateProfileUser.controller';
import { User } from './infra/typeorm/entities/User.entity';
import { UserToken } from './infra/typeorm/entities/UserToken.entity';
import { UsersRepository } from './infra/typeorm/repositories/Users.repository';
import { UsersTokensRepository } from './infra/typeorm/repositories/UsersTokens.repository';
import { AuthProviderModule } from './providers/authProvider/authProvider.module';
import { JwtStrategy } from './providers/authProvider/implementations/JwtStrategy.provider';
import DayjsDateProvider from './providers/dateProvider/implementations/dayjsDate.provider';
import { HashProviderModule } from './providers/hashProvider/hashProvider.module';
import { BCryptHashProvider } from './providers/hashProvider/implementations/BCryptHash.provider';
import { AuthenticateUserService } from './services/AuthenticateUser.service';
import { CreateUserService } from './services/CreateUser.service';
import { RefreshTokenService } from './services/RefreshToken.service';
import { ResetPasswordUserService } from './services/resetPasswordUser.service';
import { SendForgotPasswordMailService } from './services/SendForgotPasswordMail.service';
import { ShowProfileUserService } from './services/ShowProfileUser.service';
import { UpdateUserService } from './services/UpdateUser.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserToken]),
    HashProviderModule,
    AuthProviderModule,
    JwtModule.register({
      secret: jwt.secret,
      signOptions: { expiresIn: jwt.expiresIn },
    }),
  ],
  controllers: [
    AuthenticatedUserController,
    CreateUsersController,
    UpdateProfileUserController,
    ShowProfileUserController,
    RefreshTokenController,
    SendForgotPasswordMailController,
    ResetPasswordUserController,
  ],
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
    {
      provide: DATE_PROVIDER,
      useClass: DayjsDateProvider,
    },
    {
      provide: ETHEREAL_MAIL_PROVIDER,
      useClass: EtherealMailProvider,
    },
    {
      provide: MAIL_TEMPLATE_PROVIDER,
      useClass: HandlebarMailTemplateProvider,
    },
    JwtStrategy,
    AuthenticateUserService,
    CreateUserService,
    UpdateUserService,
    ShowProfileUserService,
    RefreshTokenService,
    SendForgotPasswordMailService,
    ResetPasswordUserService,
  ],
})
export class UsersModule {}
