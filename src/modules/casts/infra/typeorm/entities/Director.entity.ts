import { Movie } from '@/modules/movies/infra/typeorm/entities/Movie.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('directors')
export class Director {
  @ApiProperty({
    example: '5c88a6a9-ccb2-4149-b1e7-a3412577bbe8',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Joe Smith',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'M',
  })
  @Column()
  gender: string;

  @OneToMany(() => Movie, (movies) => movies.director)
  movies?: Movie[];

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
