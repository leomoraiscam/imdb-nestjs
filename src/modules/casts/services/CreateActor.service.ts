import { ACTORS_REPOSITORY } from '@/config/constants/repositories.constants';
import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { CreateActorsDTO } from '../dtos/requests/CreateActors.dto';
import { Actor } from '../infra/typeorm/entities/Actor.entity';
import { IActorsRepository } from '../repositories/ActorsRepository.interface';

@Injectable()
export class CreateActorService {
  constructor(
    @Inject(ACTORS_REPOSITORY)
    private readonly actorsRepository: IActorsRepository,
  ) {}

  public async execute({ name, gender }: CreateActorsDTO): Promise<Actor> {
    const checkActorsExists = await this.actorsRepository.findByName(name);

    if (checkActorsExists) {
      throw new ConflictException('This actor already exist');
    }

    return this.actorsRepository.create({
      name,
      gender,
    });
  }
}
