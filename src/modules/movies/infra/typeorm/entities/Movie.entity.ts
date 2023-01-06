import { Actor } from '@/modules/casts/infra/typeorm/entities/Actor.entity';
import { Director } from '@/modules/casts/infra/typeorm/entities/Direction.entity';
import { Vote } from '@/modules/movies/infra/typeorm/entities/Vote.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
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

  @ApiProperty()
  @Column({ name: 'director_id' })
  public directorId: string;

  @ManyToOne(() => Director, (director) => director.movies)
  @JoinColumn({ name: 'director_id' })
  director: Director;

  @ManyToMany(() => Actor)
  @JoinTable({
    name: 'movies_cast',
    joinColumns: [{ name: 'movie_id' }],
    inverseJoinColumns: [{ name: 'actor_id' }],
  })
  actors: Actor[];

  @OneToMany(() => Vote, (vote) => vote.movie)
  votes: Vote[];

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
