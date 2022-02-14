import { ICreateMovieDTO } from '../dtos/ICreateMovie.dto';
import { Movie } from '../infra/typeorm/entities/Movie.entity';

export interface IMoviesRepository {
  findById(id: string): Promise<Movie | undefined>;
  findByName(name: string): Promise<Movie | undefined>;
  create(data: ICreateMovieDTO): Promise<Movie>;
}
