import { ListMoviesDTO } from '@/modules/movies/dtos/requests/ListMovies.dto';
import { v4 as uuidv4 } from 'uuid';

import { ICreateMoviesDTO } from '../../dtos/ICreateMovies.dto';
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

  async list({ perPage, page, keyword }: ListMoviesDTO): Promise<Movie[]> {
    page = page || 1;
    perPage = perPage || 10;

    let paginatedMovies = paginate(this.movies, perPage, page);

    if (keyword) {
      paginatedMovies = paginatedMovies.filter(({ name }) =>
        name.includes(keyword),
      );
    }

    return paginatedMovies;
  }

  async create({
    name,
    description,
    author,
    duration,
    year,
    genres,
    votes,
  }: ICreateMoviesDTO): Promise<Movie> {
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

  public async delete(id: string): Promise<void> {
    const fieldIndex = this.movies.findIndex(
      (movieData) => movieData.id === id,
    );

    this.movies.splice(fieldIndex, 1);
  }
}
