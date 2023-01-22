import { GENRES_REPOSITORY } from '@/config/constants/repositories.constants';
import { Inject } from '@nestjs/common';

import { OptionsList } from '../dtos/requests/OptionsToListMovie.dto';
import { Genre } from '../infra/typeorm/entities/Genre.entity';
import { IGenresRepository } from '../repositories/IGenresRepository.interface';

export class ListGenresService {
  constructor(
    @Inject(GENRES_REPOSITORY)
    private readonly genresRepository: IGenresRepository,
  ) {}

  async execute({
    name,
    take = 10,
    page = 1,
    skip = 0,
  }: OptionsList): Promise<Genre[]> {
    return this.genresRepository.list({
      name,
      page,
      skip,
      take,
    });
  }
}
