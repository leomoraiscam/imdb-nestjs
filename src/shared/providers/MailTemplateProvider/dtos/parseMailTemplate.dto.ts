interface ITemplateVariables {
  [key: string]: string | number;
}

export class ParseMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}
