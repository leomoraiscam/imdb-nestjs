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
  @Column({ name: 'movie_id' })
  movieId: string;

  @ApiProperty()
  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => Movie, (movie) => movie.votes)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
