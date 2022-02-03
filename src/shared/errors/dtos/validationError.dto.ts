import { ApiProperty } from '@nestjs/swagger';

import { BaseErrorDTO } from './baseError.dto';

export class ValidationErrorDTO extends BaseErrorDTO {
  @ApiProperty()
  public message: string[];
}
