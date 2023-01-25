import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

import { PermissionsEnum } from '../../permissions.enum';

export class CreatePermissionsDTO {
  @ApiProperty({
    example: 'permission',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn([
    PermissionsEnum.CREATE,
    PermissionsEnum.UPDATE,
    PermissionsEnum.DELETE,
    PermissionsEnum.LIST,
  ])
  name: string;

  @ApiProperty({
    example: 'this permission to create data',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
