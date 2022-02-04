import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { RoleEnum } from '../../../../../shared/utils/role.enum';
import { Permission } from './Permission.entity';

@Entity('roles')
export class Role {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiHideProperty()
  @Column()
  @Exclude()
  name: string;

  @ApiProperty({
    name: 'name',
    type: 'string',
    example: 'Admin',
  })
  @Expose({ name: 'name' })
  getAccessType?() {
    return RoleEnum[this.name];
  }

  @ApiProperty()
  @Column()
  description: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'permissions_roles',
    joinColumns: [{ name: 'role_id' }],
    inverseJoinColumns: [{ name: 'permission_id' }],
  })
  permissions?: Permission[];

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
