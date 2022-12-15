import { Inject, NotFoundException } from '@nestjs/common';

import { Movie } from '../infra/typeorm/entities/Movie.entity';
import { IMoviesRepository } from '../repositories/IMoviesRepository.interface';

export class ShowMoviesServices {
  constructor(
    @Inject('MOVIE_REPOSITORY')
    private movieRepository: IMoviesRepository,
  ) {}

  async execute(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findById(id);

    if (!movie) {
      throw new NotFoundException('movie not found');
    }

    return movie;
  }
}
