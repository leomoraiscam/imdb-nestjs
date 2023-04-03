import { MAIL_TEMPLATE_PROVIDER } from '@/config/constants/providers.constants';
import { Inject, Injectable } from '@nestjs/common';
import {
  Transporter,
  createTestAccount,
  createTransport,
  getTestMessageUrl,
} from 'nodemailer';

import { IMailTemplateProvider } from '../../MailTemplateProvider/models/IMailTemplateProvider.interface';
import { SendMailDTO } from '../dtos/sendMail.dto';
import { IMailerProvider } from '../models/mailer.interface';

@Injectable()
export default class EtherealMailProvider implements IMailerProvider {
  private client: Transporter;

  constructor(
    @Inject(MAIL_TEMPLATE_PROVIDER)
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    createTestAccount().then((account) => {
      const transporter = createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail({
    to,
    subject,
    from,
    templateData,
  }: SendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe Imdb',
        address: from?.email || 'imdb-noreply@example.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', getTestMessageUrl(message));
  }
}
