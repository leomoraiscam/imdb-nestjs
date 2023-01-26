import { BaseEntity } from '@/shared/infra/typeorm/entities/Base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { Permission } from './Permission.entity';

@Entity('roles')
export class Role extends BaseEntity {
  @ApiProperty({
    example: 'admin',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'this role is the administrator',
  })
  @Column()
  description: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'permissions_roles',
    joinColumns: [{ name: 'role_id' }],
    inverseJoinColumns: [{ name: 'permission_id' }],
  })
  permissions?: Permission[];
}
