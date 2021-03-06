import { ICreateMovieDTO } from '../dtos/ICreateMovie.dto';
import { OptionsList } from '../dtos/IOptionsToListMovie.dto';
import { Movie } from '../infra/typeorm/entities/Movie.entity';

export interface IMoviesRepository {
  findById(id: string): Promise<Movie | undefined>;
  findByName(name: string): Promise<Movie | undefined>;
  list({
    name,
    author,
    genre_id,
    page,
    skip,
    take,
  }: OptionsList): Promise<Movie[]>;
  create(data: ICreateMovieDTO): Promise<Movie>;
}
