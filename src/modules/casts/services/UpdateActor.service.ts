import { ACTORS_REPOSITORY } from '@/config/constants/repositories.constants';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateActorsDTO } from '../dtos/requests/UpdateActors.dto';
import { Actor } from '../infra/typeorm/entities/Actor.entity';
import { IActorsRepository } from '../repositories/ActorsRepository.interface';

@Injectable()
export class UpdateActorService {
  constructor(
    @Inject(ACTORS_REPOSITORY)
    private readonly actorsRepository: IActorsRepository,
  ) {}

  public async execute({
    gender,
    name,
    actorId,
  }: UpdateActorsDTO): Promise<Actor> {
    const actor = await this.actorsRepository.findById(actorId);

    if (!actor) {
      throw new NotFoundException('actor not found');
    }

    const checkActorWithName = await this.actorsRepository.findByName(name);

    if (checkActorWithName && actorId !== checkActorWithName.id) {
      throw new ConflictException('Actor with this name already exists');
    }

    Object.assign(actor, { gender, name });

    return this.actorsRepository.save(actor);
  }
}
