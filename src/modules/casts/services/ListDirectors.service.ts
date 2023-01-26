import { DIRECTORS_REPOSITORY } from '@/config/constants/repositories.constants';
import { Inject } from '@nestjs/common';

import { ListCastsDTO } from '../dtos/requests/ListCasts.dto';
import { Director } from '../infra/typeorm/entities/Direction.entity';
import { IDirectorsRepository } from '../repositories/DirectorsRepository.interface';

export class ListDirectorsServices {
  constructor(
    @Inject(DIRECTORS_REPOSITORY)
    private readonly directorsRepository: IDirectorsRepository,
  ) {}

  async execute({
    page = 1,
    perPage = 10,
    name,
  }: ListCastsDTO): Promise<Director[]> {
    return this.directorsRepository.list({
      page,
      perPage,
      name,
    });
  }
}
