import { Movie } from '@/modules/movies/infra/typeorm/entities/Movie.entity';
import { User } from '@/modules/users/infra/typeorm/entities/User.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('votes')
export class Vote {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  note: number;

  @ApiProperty()
  @Column()
  movie_id: string;

  @ApiProperty()
  @Column()
  user_id: string;

  @ManyToOne(() => Movie, (movie) => movie.votes)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
