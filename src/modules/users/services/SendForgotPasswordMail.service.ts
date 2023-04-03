import {
  DATE_PROVIDER,
  ETHEREAL_MAIL_PROVIDER,
} from '@/config/constants/providers.constants';
import {
  USERS_REPOSITORY,
  USERS_TOKENS_REPOSITORY,
} from '@/config/constants/repositories.constants';
import { IMailerProvider } from '@/shared/providers/MailerProvider/models/mailer.interface';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { resolve } from 'path';
import { v4 as uuidv4 } from 'uuid';

import { IDateProvider } from '../providers/dateProvider/models/DateProvider.interface';
import { IUsersRepository } from '../repositories/UsersRepository.interface';
import { IUsersTokensRepository } from '../repositories/UsersTokensRepository.interface';

@Injectable()
export class SendForgotPasswordMailService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
    @Inject(USERS_TOKENS_REPOSITORY)
    private readonly usersTokensRepository: IUsersTokensRepository,
    @Inject(DATE_PROVIDER)
    private readonly dateProvider: IDateProvider,
    @Inject(ETHEREAL_MAIL_PROVIDER)
    private readonly mailProvider: IMailerProvider,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const token = uuidv4();

    const expires = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refreshToken: token,
      userId: user.id,
      expiresDate: expires,
    });

    const forgotPasswordTemplate = resolve(
      __dirname,
      '..',
      'views',
      'forgotPassword.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email,
      },
      subject: 'recuperacao de senha',
      templateData: {
        variables: {
          link: `${process.env.APP_URL}:${process.env.APP_PORT}/reset-password?token=${token}`,
        },
        file: forgotPasswordTemplate,
      },
    });
  }
}
