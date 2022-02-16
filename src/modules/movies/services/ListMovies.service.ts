import { Inject } from '@nestjs/common';

import { Movie } from '../infra/typeorm/entities/Movie.entity';
import { IMoviesRepository } from '../repositories/IMoviesRepository.interface';

export class ListMoviesServices {
  constructor(
    @Inject('MOVIE_REPOSITORY')
    private movieRepository: IMoviesRepository,
  ) {}

  async execute(): Promise<Movie[]> {
    return this.movieRepository.list();
  }
}
