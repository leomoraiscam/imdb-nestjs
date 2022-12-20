import { ApiProperty } from '@nestjs/swagger';

import { Permission } from '../../../infra/typeorm/entities/Permission.entity';

export class CreatePermissionRolesResponseDTO {
  @ApiProperty({
    example: '1e131dd6-3945-460f-a417-fd2b0e90fac4',
  })
  id: string;

  @ApiProperty({
    example: 'admin',
  })
  name: string;

  @ApiProperty({
    example: 'this role is the administrator',
  })
  description: string;

  @ApiProperty({
    type: [Permission],
  })
  permissions: Permission[];

  @ApiProperty()
  created_at: Date;
}
