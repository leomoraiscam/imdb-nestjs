import { CreateActorDTO } from '@/modules/casts/dtos/requests/CreateActor.dto';
import { OptionsList } from '@/modules/casts/dtos/requests/OptionsToListData.dto';
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

  async list({ name, take, page }: OptionsList): Promise<Actor[]> {
    const actorsQuery = await this.repository
      .createQueryBuilder('m')
      .take(take)
      .skip(take * (page - 1));

    if (name) {
      actorsQuery.andWhere(`m.name = :name`, { name });
    }

    const actors = await actorsQuery.getMany();

    return actors;
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
