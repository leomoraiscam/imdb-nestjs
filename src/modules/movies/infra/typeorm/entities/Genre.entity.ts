import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('genres')
export class Genre {
  @ApiProperty({
    example: '37b75d18-d4cf-499a-9129-b71f2c4abc76',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
