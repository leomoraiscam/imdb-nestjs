import { v4 as uuidv4 } from 'uuid';

import { ICreateMovieDTO } from '../../dtos/ICreateMovie.dto';
import { Movie } from '../../infra/typeorm/entities/Movie.entity';
import { IMoviesRepository } from '../IMoviesRepository.interface';

export class InMemoryMoviesRepository implements IMoviesRepository {
  private movies: Movie[] = [];

  async findById(id: string): Promise<Movie | undefined> {
    return this.movies.find((movie) => movie.id === id);
  }

  async findByName(name: string): Promise<Movie | undefined> {
    return this.movies.find((movie) => movie.name === name);
  }

  async create({
    name,
    description,
    author,
    duration,
    year,
    genres,
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
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.movies.push(movie);

    return movie;
  }
}
