import { ICreateMovieGenre } from '../dtos/ICreateMovieGenre.dto';
import { Movie } from '../infra/typeorm/entities/Movie.entity';

export interface IMoviesRepository {
  findByName(name: string): Promise<Movie | undefined>;
  create(data: ICreateMovieGenre): Promise<Movie>;
}
