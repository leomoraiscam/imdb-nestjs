import { DIRECTORS_REPOSITORY } from '@/config/constants/repositories.constants';
import { Inject, NotFoundException } from '@nestjs/common';

import { IDirectorsRepository } from '../repositories/DirectorsRepository.interface';

export class DeleteDirectorService {
  constructor(
    @Inject(DIRECTORS_REPOSITORY)
    private readonly directorsRepository: IDirectorsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const director = await this.directorsRepository.findById(id);

    if (!director) {
      throw new NotFoundException('Cannot delete an non-existing director');
    }

    return this.directorsRepository.delete(id);
  }
}
