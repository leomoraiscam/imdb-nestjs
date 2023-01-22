import { GENRES_REPOSITORY } from '@/config/constants/repositories.constants';
import { Inject, NotFoundException } from '@nestjs/common';

import { IGenresRepository } from '../repositories/IGenresRepository.interface';

export class DeleteGenreService {
  constructor(
    @Inject(GENRES_REPOSITORY)
    private readonly genresRepository: IGenresRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const genre = await this.genresRepository.findById(id);

    if (!genre) {
      throw new NotFoundException('Cannot delete an non-existing genre');
    }

    return this.genresRepository.delete(id);
  }
}
