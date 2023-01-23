import { DIRECTORS_REPOSITORY } from '@/config/constants/repositories.constants';
import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { CreateDirectorsDTO } from '../dtos/requests/CreateDirectors.dto';
import { Director } from '../infra/typeorm/entities/Direction.entity';
import { IDirectorsRepository } from '../repositories/DirectorsRepository.interface';

@Injectable()
export class CreateDirectorService {
  constructor(
    @Inject(DIRECTORS_REPOSITORY)
    private readonly directorsRepository: IDirectorsRepository,
  ) {}

  public async execute({
    name,
    gender,
  }: CreateDirectorsDTO): Promise<Director> {
    const checkDirectorExists = await this.directorsRepository.findByName(name);

    if (checkDirectorExists) {
      throw new ConflictException('This director already exist');
    }

    return this.directorsRepository.create({
      name,
      gender,
    });
  }
}
