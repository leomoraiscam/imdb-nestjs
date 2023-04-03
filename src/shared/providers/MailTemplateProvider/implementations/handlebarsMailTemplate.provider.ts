import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import handlebars from 'handlebars';

import { ParseMailTemplateDTO } from '../dtos/parseMailTemplate.dto';
import { IMailTemplateProvider } from '../models/IMailTemplateProvider.interface';

@Injectable()
export class HandlebarMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: ParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
