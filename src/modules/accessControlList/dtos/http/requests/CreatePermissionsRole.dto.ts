import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';

export class CreatePermissionsRoleDTO {
  @ApiProperty({
    example: [
      '9c8b2753-c658-405d-85db-de40e20c53bf',
      'a5ac4c0b-db31-485b-8c88-489c1dcab24d',
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  permissions: string[];
}
