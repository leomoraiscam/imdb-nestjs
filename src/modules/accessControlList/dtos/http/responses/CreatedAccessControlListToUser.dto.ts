import { Permission } from '@/modules/accessControlList/infra/typeorm/entities/Permission.entity';
import { Role } from '@/modules/accessControlList/infra/typeorm/entities/Role.entity';
import { User } from '@/modules/users/infra/typeorm/entities/User.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class CreatedACLToUserDTO extends User {
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
