import { CreateActorDTO } from '../dtos/requests/CreateActor.dto';
import { OptionsList } from '../dtos/requests/OptionsToListData.dto';
import { Actor } from '../infra/typeorm/entities/Actor.entity';

export interface IActorsRepository {
  findByIds(ids: string[]): Promise<Actor[]>;
  findByName(name: string): Promise<Actor>;
  list(options: OptionsList): Promise<Actor[]>;
  create(data: CreateActorDTO): Promise<Actor>;
}
