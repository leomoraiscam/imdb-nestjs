import { BaseEntity } from '@/shared/infra/typeorm/entities/Base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

@Entity('permissions')
export class Permission extends BaseEntity {
  @ApiProperty({
    example: 'create',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'this permission to create data',
  })
  @Column()
  description: string;
}
