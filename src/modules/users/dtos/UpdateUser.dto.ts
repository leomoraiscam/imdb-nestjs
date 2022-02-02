import { PartialType } from '@nestjs/mapped-types';
import { ValidateIf, IsNotEmpty, IsString } from 'class-validator';

import { CreateUserDTO } from './CreateUser.dto';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ValidateIf((requestBody) => !!requestBody.password)
  @IsNotEmpty()
  oldPassword: string;
}
