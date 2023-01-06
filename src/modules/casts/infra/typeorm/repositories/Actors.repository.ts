import { CreateActorDTO } from '@/modules/casts/dtos/requests/CreateActor.dto';
import { IActorsRepository } from '@/modules/casts/repositories/ActorsRepository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Actor } from '../entities/Actor.entity';

@Injectable()
export class ActorsRepository implements IActorsRepository {
  constructor(
    @InjectRepository(Actor)
    private repository: Repository<Actor>,
  ) {}

  async findByIds(ids: string[]): Promise<Actor[]> {
    return this.repository.findByIds(ids);
  }

  async findByName(name: string): Promise<Actor> {
    return this.repository.findOne({
      where: {
        name,
      },
    });
  }

  async create({ name, gender }: CreateActorDTO): Promise<Actor> {
    const actor = this.repository.create({
      name,
      gender,
    });

    await this.repository.save(actor);

    return actor;
  }
}
