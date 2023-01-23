import { paginate } from '@/modules/movies/utils/paginateArrayInMemory';
import { v4 as uuid } from 'uuid';

import { CreateActorsDTO } from '../../dtos/requests/CreateActors.dto';
import { OptionsList } from '../../dtos/requests/OptionsToListData.dto';
import { Actor } from '../../infra/typeorm/entities/Actor.entity';
import { IActorsRepository } from '../ActorsRepository.interface';

export class InMemoryActorsRepository implements IActorsRepository {
  private actors: Actor[] = [];

  async findById(id: string): Promise<Actor> {
    return this.actors.find((actor) => actor.id === id);
  }

  async findByIds(ids: string[]): Promise<Actor[]> {
    const allActors = this.actors.filter((actor) => ids.includes(actor.id));

    return allActors;
  }

  public async findByName(name: string): Promise<Actor> {
    return this.actors.find((actor) => actor.name === name);
  }

  async list({ take, skip }: OptionsList): Promise<Actor[]> {
    let data = [];

    take = take || 1;
    skip = skip || 10;

    const auxVar = this.actors;

    data = auxVar.map((actor) => {
      const json = Object.assign({}, actor);

      return json;
    });

    data = paginate(data, skip, take);

    return data;
  }

  public async create({ name, gender }: CreateActorsDTO): Promise<Actor> {
    const actor = new Actor();

    Object.assign(actor, { id: uuid(), name, gender });

    this.actors.push(actor);

    return actor;
  }

  public async save(actor: Actor): Promise<Actor> {
    const findIndex = this.actors.findIndex(
      (actorData) => actorData.id === actor.id,
    );

    this.actors[findIndex] = actor;

    return actor;
  }

  public async delete(id: string): Promise<void> {
    const fieldIndex = this.actors.findIndex(
      (actorData) => actorData.id === id,
    );

    this.actors.splice(fieldIndex, 1);
  }
}
