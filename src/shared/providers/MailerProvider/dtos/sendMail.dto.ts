import { ParseMailTemplateDTO } from '../../MailTemplateProvider/dtos/parseMailTemplate.dto';

interface IMailContact {
  name: string;
  email: string;
}

export class SendMailDTO {
  from?: IMailContact;
  to: IMailContact;
  subject: string;
  templateData: ParseMailTemplateDTO;
}
