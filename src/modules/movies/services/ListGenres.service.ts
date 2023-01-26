import { GENRES_REPOSITORY } from '@/config/constants/repositories.constants';
import { Inject } from '@nestjs/common';

import { ListGenresDTO } from '../dtos/requests/ListGenres.dto';
import { Genre } from '../infra/typeorm/entities/Genre.entity';
import { IGenresRepository } from '../repositories/IGenresRepository.interface';

export class ListGenresService {
  constructor(
    @Inject(GENRES_REPOSITORY)
    private readonly genresRepository: IGenresRepository,
  ) {}

  async execute({
    name,
    perPage = 10,
    page = 1,
    keyword,
  }: ListGenresDTO): Promise<Genre[]> {
    return this.genresRepository.list({
      name,
      page,
      perPage,
      keyword,
    });
  }
}
