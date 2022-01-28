import { PartialType } from '@nestjs/mapped-types';
import { ValidateIf, IsNotEmpty } from 'class-validator';

import { CreateUserDTO } from './CreateUserDTO';

export class UpdateUserDto extends PartialType(CreateUserDTO) {
  userId: string;

  @ValidateIf((requestBody) => !!requestBody.password)
  @IsNotEmpty()
  oldPassword: string;
}
