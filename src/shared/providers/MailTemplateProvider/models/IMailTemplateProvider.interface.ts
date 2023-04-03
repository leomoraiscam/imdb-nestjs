import { ParseMailTemplateDTO } from '../dtos/parseMailTemplate.dto';

export interface IMailTemplateProvider {
  parse(data: ParseMailTemplateDTO): Promise<string>;
}
