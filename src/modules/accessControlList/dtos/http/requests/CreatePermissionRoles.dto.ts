import { ApiProperty } from '@nestjs/swagger';
import { IsArray, Min } from 'class-validator';

export class CreatePermissionRolesDTO {
  @ApiProperty({
    example: [
      '9c8b2753-c658-405d-85db-de40e20c53bf',
      'a5ac4c0b-db31-485b-8c88-489c1dcab24d',
    ],
  })
  @IsArray()
  // @Min(1)
  permissions: string[];
}
