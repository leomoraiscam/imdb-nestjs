import { Permission } from '@/modules/accessControlList/infra/typeorm/entities/Permission.entity';
import { Role } from '@/modules/accessControlList/infra/typeorm/entities/Role.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({
    example: 'cc1b9ff1-6956-4db1-9500-9fbd9b37635d',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deleted_at: Date;
}
