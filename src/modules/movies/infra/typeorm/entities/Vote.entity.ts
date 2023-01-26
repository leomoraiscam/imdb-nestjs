import { Movie } from '@/modules/movies/infra/typeorm/entities/Movie.entity';
import { User } from '@/modules/users/infra/typeorm/entities/User.entity';
import { BaseEntity } from '@/shared/infra/typeorm/entities/Base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('votes')
export class Vote extends BaseEntity {
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
}
