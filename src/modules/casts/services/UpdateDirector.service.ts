import { DIRECTORS_REPOSITORY } from '@/config/constants/repositories.constants';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateDirectorDTO } from '../dtos/requests/UpdateDirector.dto';
import { Director } from '../infra/typeorm/entities/Direction.entity';
import { IDirectorsRepository } from '../repositories/DirectorsRepository.interface';

@Injectable()
export class UpdateDirectorService {
  constructor(
    @Inject(DIRECTORS_REPOSITORY)
    private readonly directorsRepository: IDirectorsRepository,
  ) {}

  public async execute({
    gender,
    name,
    directorId,
  }: UpdateDirectorDTO): Promise<Director> {
    const director = await this.directorsRepository.findById(directorId);

    if (!director) {
      throw new NotFoundException('director not found');
    }

    const checkDirectorWithName = await this.directorsRepository.findByName(
      name,
    );

    if (checkDirectorWithName && directorId !== checkDirectorWithName.id) {
      throw new ConflictException('Director with this name already exists');
    }

    Object.assign(director, { gender, name });

    return this.directorsRepository.save(director);
  }
}
