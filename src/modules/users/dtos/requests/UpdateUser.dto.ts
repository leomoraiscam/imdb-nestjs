import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ValidateIf, IsNotEmpty, IsString, IsOptional } from 'class-validator';

import { CreateUserDTO } from './CreateUser.dto';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
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
