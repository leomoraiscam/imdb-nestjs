import { BaseEntity } from '@/shared/infra/typeorm/entities/Base.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { User } from './User.entity';

@Entity('users_tokens')
export class UserToken extends BaseEntity {
  @ApiProperty({
    example: 'John Doe',
  })
  @Column({ name: 'refresh_token' })
  refreshToken: string;

  @ApiProperty({
    example: 'john@email.com',
  })
  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'expires_date' })
  expiresDate: Date;

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
