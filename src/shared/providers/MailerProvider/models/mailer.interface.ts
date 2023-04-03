import { SendMailDTO } from '../dtos/sendMail.dto';

export interface IMailerProvider {
  sendMail(data: SendMailDTO): Promise<void>;
}
