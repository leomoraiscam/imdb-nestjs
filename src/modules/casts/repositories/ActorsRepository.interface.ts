import { CreateActorDTO } from '../dtos/requests/CreateActor.dto';
import { Actor } from '../infra/typeorm/entities/Actor.entity';

export interface IActorsRepository {
  findByIds(ids: string[]): Promise<Actor[]>;
  findByName(name: string): Promise<Actor>;
  create(data: CreateActorDTO): Promise<Actor>;
}
