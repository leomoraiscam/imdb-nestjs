import { MOVIES_REPOSITORY } from '@/config/constants/repositories.constants';
import { Inject, NotFoundException } from '@nestjs/common';

import { Movie } from '../infra/typeorm/entities/Movie.entity';
import { IMoviesRepository } from '../repositories/IMoviesRepository.interface';

export class ShowMovieService {
  constructor(
    @Inject(MOVIES_REPOSITORY)
    private readonly moviesRepository: IMoviesRepository,
  ) {}

  async execute(id: string): Promise<Movie> {
    const movie = await this.moviesRepository.findById(id);

    if (!movie) {
      throw new NotFoundException('movie not found');
    }

    return movie;
  }
}
