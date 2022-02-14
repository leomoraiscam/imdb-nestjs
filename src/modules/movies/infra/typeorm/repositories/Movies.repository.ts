import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ICreateMovieGenre } from '../../../dtos/ICreateMovieGenre.dto';
import { IMoviesRepository } from '../../../repositories/IMoviesRepository.interface';
import { Movie } from '../entities/Movie.entity';

export class MoviesRepository implements IMoviesRepository {
  constructor(
    @InjectRepository(Movie)
    private repository: Repository<Movie>,
  ) {}

  async findByName(name: string): Promise<Movie | undefined> {
    return this.repository.findOne({
      where: {
        name,
      },
    });
  }

  async create({
    name,
    description,
    author,
    duration,
    year,
    genres,
  }: ICreateMovieGenre): Promise<Movie> {
    const movie = this.repository.create({
      name,
      description,
      author,
      duration,
      year,
      genres,
    });

    await this.repository.save(movie);

    return movie;
  }
}
