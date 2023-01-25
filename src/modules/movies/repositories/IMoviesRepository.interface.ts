import { ICreateMoviesDTO } from '../dtos/ICreateMovies.dto';
import { OptionsList } from '../dtos/requests/OptionsToListMovie.dto';
import { Movie } from '../infra/typeorm/entities/Movie.entity';

export interface IMoviesRepository {
  findById(id: string): Promise<Movie | undefined>;
  findByName(name: string): Promise<Movie | undefined>;
  list(options: OptionsList): Promise<Movie[]>;
  create(data: ICreateMoviesDTO): Promise<Movie>;
  save(movie: Movie): Promise<Movie>;
  delete(id: string): Promise<void>;
}
