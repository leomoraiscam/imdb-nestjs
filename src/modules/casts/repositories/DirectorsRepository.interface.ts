import { CreateDirectorsDTO } from '../dtos/requests/CreateDirectors.dto';
import { OptionsList } from '../dtos/requests/OptionsToListData.dto';
import { Director } from '../infra/typeorm/entities/Direction.entity';

export interface IDirectorsRepository {
  findById(id: string): Promise<Director>;
  findByName(name: string): Promise<Director>;
  list(options: OptionsList): Promise<Director[]>;
  create(data: CreateDirectorsDTO): Promise<Director>;
  save(director: Director): Promise<Director>;
  delete(id: string): Promise<void>;
}
