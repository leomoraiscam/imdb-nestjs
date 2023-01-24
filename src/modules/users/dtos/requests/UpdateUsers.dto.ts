import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ValidateIf, IsNotEmpty, IsString, IsOptional } from 'class-validator';

import { CreateUsersDTO } from './CreateUsers.dto';

export class UpdateUsersDTO extends PartialType(CreateUsersDTO) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userId?: string;

  @ApiProperty({
    example: 'test@123',
  })
  @ValidateIf((requestBody) => !!requestBody.password)
  @IsNotEmpty()
  oldPassword: string;
}
