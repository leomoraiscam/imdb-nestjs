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
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  author: string;

  @ApiProperty()
  @Column()
  year: number;

  @ApiProperty()
  @Column()
  duration: string;

  @ManyToMany(() => Genre)
  @JoinTable({
    name: 'movies_genres',
    joinColumns: [{ name: 'movie_id' }],
    inverseJoinColumns: [{ name: 'genre_id' }],
  })
  genres: Genre[];

  @OneToMany(() => Vote, (vote) => vote)
  votes: Vote[];

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
