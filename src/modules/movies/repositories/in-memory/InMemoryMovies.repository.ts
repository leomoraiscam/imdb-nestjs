import { OptionsList } from '@/modules/movies/dtos/requests/OptionsToListMovie.dto';
import { v4 as uuidv4 } from 'uuid';

import { ICreateMovieDTO } from '../../dtos/ICreateMovie.dto';
import { Movie } from '../../infra/typeorm/entities/Movie.entity';
import { paginate } from '../../utils/paginateArrayInMemory';
import { IMoviesRepository } from '../IMoviesRepository.interface';

export class InMemoryMoviesRepository implements IMoviesRepository {
  private movies: Movie[] = [];

  async findById(id: string): Promise<Movie | undefined> {
    return this.movies.find((movie) => movie.id === id);
  }

  async findByName(name: string): Promise<Movie | undefined> {
    return this.movies.find((movie) => movie.name === name);
  }

  async list({ take, skip }: OptionsList): Promise<Movie[]> {
    let data = [];

    take = take || 1;
    skip = skip || 10;

    const auxVar = this.movies;

    data = auxVar.map((term) => {
      const json = Object.assign({}, term);
      return json;
    });

    data = paginate(data, skip, take);

    return data;
  }

  async create({
    name,
    description,
    author,
    duration,
    year,
    genres,
    votes,
  }: ICreateMovieDTO): Promise<Movie> {
    const movie = new Movie();

    Object.assign(movie, {
      id: uuidv4(),
      name,
      description,
      author,
      duration,
      year,
      genres,
      votes,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.movies.push(movie);

    return movie;
  }

  async save(movie: Movie): Promise<Movie> {
    const findIndex = this.movies.findIndex(
      (movieData) => movieData.id === movie.id,
    );

    this.movies[findIndex] = movie;

    return movie;
  }
}
