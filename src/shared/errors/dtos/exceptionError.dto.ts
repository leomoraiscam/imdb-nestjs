import { ApiProperty } from '@nestjs/swagger';

import { BaseErrorDTO } from './baseError.dto';

export class ExceptionErrorDTO extends BaseErrorDTO {
  @ApiProperty()
  public message: string;
}
