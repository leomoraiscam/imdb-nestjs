import { BaseEntity } from '@/shared/infra/typeorm/entities/Base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

@Entity('genres')
export class Genre extends BaseEntity {
  @ApiProperty({
    example: 'aventura',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'this all movies of adventure',
  })
  @Column()
  description: string;
}
