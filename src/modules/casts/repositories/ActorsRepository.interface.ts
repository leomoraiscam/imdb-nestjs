import { CreateActorsDTO } from '../dtos/requests/CreateActors.dto';
import { OptionsList } from '../dtos/requests/OptionsToListData.dto';
import { Actor } from '../infra/typeorm/entities/Actor.entity';

export interface IActorsRepository {
  findById(id: string): Promise<Actor>;
  findByIds(ids: string[]): Promise<Actor[]>;
  findByName(name: string): Promise<Actor>;
  list(options: OptionsList): Promise<Actor[]>;
  create(data: CreateActorsDTO): Promise<Actor>;
  save(actor: Actor): Promise<Actor>;
  delete(id: string): Promise<void>;
}
