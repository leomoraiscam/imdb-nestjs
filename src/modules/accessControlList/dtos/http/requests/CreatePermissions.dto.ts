import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

import { PermissionEnum } from '../../permissions.enum';

export class CreatePermissionsDTO {
  @ApiProperty({
    example: 'permission',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn([
    PermissionEnum.CREATE,
    PermissionEnum.UPDATE,
    PermissionEnum.DELETE,
    PermissionEnum.LIST,
  ])
  name: string;

  @ApiProperty({
    example: 'this permission to create data',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
