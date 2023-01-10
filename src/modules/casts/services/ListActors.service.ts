import { Inject } from '@nestjs/common';

import { OptionsList } from '../dtos/requests/OptionsToListData.dto';
import { Actor } from '../infra/typeorm/entities/Actor.entity';
import { IActorsRepository } from '../repositories/ActorsRepository.interface';

export class ListActorsServices {
  constructor(
    @Inject('ACTOR_REPOSITORY')
    private readonly actorsRepository: IActorsRepository,
  ) {}

  async execute({
    take = 10,
    page = 1,
    skip = 0,
  }: OptionsList): Promise<Actor[]> {
    return this.actorsRepository.list({
      page,
      skip,
      take,
    });
  }
}
