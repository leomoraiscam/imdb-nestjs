import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BaseErrorDTO {
  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  public status: number;

  @ApiProperty()
  public error: string;
}
