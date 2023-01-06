import { CreateDirectorDTO } from '../dtos/requests/CreateDirector.dto';
import { Director } from '../infra/typeorm/entities/Direction.entity';

export interface IDirectorsRepository {
  findById(id: string): Promise<Director>;
  findByName(name: string): Promise<Director>;
  create(data: CreateDirectorDTO): Promise<Director>;
}
