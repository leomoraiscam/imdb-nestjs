import { MOVIES_REPOSITORY } from '@/config/constants/repositories.constants';
import { Inject, NotFoundException } from '@nestjs/common';

import { IMoviesRepository } from '../repositories/IMoviesRepository.interface';

export class DeleteMovieService {
  constructor(
    @Inject(MOVIES_REPOSITORY)
    private readonly moviesRepository: IMoviesRepository,
  ) {}

  public async execute(movieId: string): Promise<void> {
    const movie = await this.moviesRepository.findById(movieId);

    if (!movie) {
      throw new NotFoundException('Cannot delete an non-existing movie');
    }

    return this.moviesRepository.delete(movieId);
  }
}
