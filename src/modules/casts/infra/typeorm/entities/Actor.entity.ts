import { BaseEntity } from '@/shared/infra/typeorm/entities/Base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, DeleteDateColumn, Entity } from 'typeorm';

@Entity('actors')
export class Actor extends BaseEntity {
  @ApiProperty({
    example: 'Joe Doe',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'M',
  })
  @Column()
  gender: string;

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
