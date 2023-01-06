import { Director } from '../infra/typeorm/entities/Direction.entity';

export interface IDirectorsRepository {
  findById(id: string): Promise<Director>;
}
