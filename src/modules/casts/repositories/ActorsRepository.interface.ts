import { Actor } from '../infra/typeorm/entities/Actor.entity';

export interface IActorsRepository {
  findByIds(ids: string[]): Promise<Actor[]>;
}
