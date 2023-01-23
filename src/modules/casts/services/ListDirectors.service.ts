import { DIRECTORS_REPOSITORY } from '@/config/constants/repositories.constants';
import { Inject } from '@nestjs/common';

import { OptionsList } from '../dtos/requests/OptionsToListData.dto';
import { Director } from '../infra/typeorm/entities/Direction.entity';
import { IDirectorsRepository } from '../repositories/DirectorsRepository.interface';

export class ListDirectorsServices {
  constructor(
    @Inject(DIRECTORS_REPOSITORY)
    private readonly directorsRepository: IDirectorsRepository,
  ) {}

  async execute({
    take = 10,
    page = 1,
    skip = 0,
  }: OptionsList): Promise<Director[]> {
    return this.directorsRepository.list({
      page,
      skip,
      take,
    });
  }
}
