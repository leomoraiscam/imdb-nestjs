import { ICreateMovieDTO } from '../dtos/ICreateMovie.dto';
import { OptionsList } from '../dtos/requests/OptionsToListMovie.dto';
import { Movie } from '../infra/typeorm/entities/Movie.entity';

export interface IMoviesRepository {
  findById(id: string): Promise<Movie | undefined>;
  findByName(name: string): Promise<Movie | undefined>;
  list({
    name,
    author,
    genreIds,
    page,
    skip,
    take,
  }: OptionsList): Promise<Movie[]>;
  create(data: ICreateMovieDTO): Promise<Movie>;
  save(movie: Movie): Promise<Movie>;
  delete(id: string): Promise<void>;
}
