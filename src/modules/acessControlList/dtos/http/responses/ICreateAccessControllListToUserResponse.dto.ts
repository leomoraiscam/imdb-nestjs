import { User } from '@/modules/users/infra/typeorm/entities/User.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

import { Permission } from '../../../infra/typeorm/entities/Permission.entity';
import { Role } from '../../../infra/typeorm/entities/Role.entity';

export class ICreateACLToUserResponseDTO extends User {
  @ApiProperty({
    type: [Permission],
  })
  @IsNotEmpty()
  permissions: Permission[];

  @ApiProperty({
    type: [Role],
  })
  @IsArray()
  roles: Role[];
}
