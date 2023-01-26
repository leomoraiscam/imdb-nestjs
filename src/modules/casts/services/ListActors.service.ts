import { ACTORS_REPOSITORY } from '@/config/constants/repositories.constants';
import { Inject } from '@nestjs/common';

import { ListCastsDTO } from '../dtos/requests/ListCasts.dto';
import { Actor } from '../infra/typeorm/entities/Actor.entity';
import { IActorsRepository } from '../repositories/ActorsRepository.interface';

export class ListActorsServices {
  constructor(
    @Inject(ACTORS_REPOSITORY)
    private readonly actorsRepository: IActorsRepository,
  ) {}

  async execute({
    page = 1,
    perPage = 10,
    name,
  }: ListCastsDTO): Promise<Actor[]> {
    name = name || '';

    return this.actorsRepository.list({
      page,
      perPage,
      name,
    });
  }
}
