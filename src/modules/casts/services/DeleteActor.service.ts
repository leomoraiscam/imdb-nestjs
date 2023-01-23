import { ACTORS_REPOSITORY } from '@/config/constants/repositories.constants';
import { Inject, NotFoundException } from '@nestjs/common';

import { IActorsRepository } from '../repositories/ActorsRepository.interface';

export class DeleteActorService {
  constructor(
    @Inject(ACTORS_REPOSITORY)
    private readonly actorsRepository: IActorsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const actor = await this.actorsRepository.findById(id);

    if (!actor) {
      throw new NotFoundException('Cannot delete an non-existing actor');
    }

    return this.actorsRepository.delete(id);
  }
}
