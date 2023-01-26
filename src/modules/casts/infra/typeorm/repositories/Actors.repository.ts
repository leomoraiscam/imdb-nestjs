import { CreateActorsDTO } from '@/modules/casts/dtos/requests/CreateActors.dto';
import { ListCastsDTO } from '@/modules/casts/dtos/requests/ListCasts.dto';
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

  async findById(id: string): Promise<Actor> {
    return this.repository.findOne(id);
  }

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

  async list({ name, page, perPage }: ListCastsDTO): Promise<Actor[]> {
    const actorsQuery = await this.repository
      .createQueryBuilder('actor')
      .take(perPage)
      .skip(perPage * (page - 1));

    if (name) {
      actorsQuery.andWhere(`actor.name like :name`, { name: `%${name}%` });
    }

    const actors = await actorsQuery.getMany();

    return actors;
  }

  async create({ name, gender }: CreateActorsDTO): Promise<Actor> {
    const actor = this.repository.create({
      name,
      gender,
    });

    await this.repository.save(actor);

    return actor;
  }

  async save(actor: Actor): Promise<Actor> {
    return this.repository.save(actor);
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
