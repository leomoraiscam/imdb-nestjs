import { ApiProperty } from '@nestjs/swagger';
import { Vote } from 'src/modules/votes/infra/typeorm/entities/Vote.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Genre } from './Genre.entity';

@Entity('movies')
export class Movie {
  @ApiProperty({
    example: '935a220e-a653-4856-80ba-990a71aa069d',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Transformers',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'The robots movie',
  })
  @Column()
  description: string;

  @ApiProperty({
    example: 'John Doe',
  })
  @Column()
  author: string;

  @ApiProperty({
    example: 2018,
  })
  @Column()
  year: number;

  @ApiProperty({
    example: '1h:20',
  })
  @Column()
  duration: string;

  @ManyToMany(() => Genre)
  @JoinTable({
    name: 'movies_genres',
    joinColumns: [{ name: 'movie_id' }],
    inverseJoinColumns: [{ name: 'genre_id' }],
  })
  genres: Genre[];

  @OneToMany(() => Vote, (vote) => vote.movie)
  votes: Vote[];

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
