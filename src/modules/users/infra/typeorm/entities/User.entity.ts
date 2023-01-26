import { Permission } from '@/modules/accessControlList/infra/typeorm/entities/Permission.entity';
import { Role } from '@/modules/accessControlList/infra/typeorm/entities/Role.entity';
import { BaseEntity } from '@/shared/infra/typeorm/entities/Base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @ApiProperty({
    example: 'John Doe',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'john@email.com',
  })
  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_roles',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'role_id' }],
  })
  roles: Role[];

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'users_permissions',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'permission_id' }],
  })
  permissions: Permission[];

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
