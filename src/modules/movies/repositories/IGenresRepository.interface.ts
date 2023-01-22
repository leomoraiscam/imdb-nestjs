import { CreateGenresDTO } from '../dtos/requests/CreateGenres.dto';
import { OptionsList } from '../dtos/requests/OptionsToListMovie.dto';
import { Genre } from '../infra/typeorm/entities/Genre.entity';

export interface IGenresRepository {
  findByIds(ids: string[]): Promise<Genre[]>;
  findByName(name: string): Promise<Genre | undefined>;
  list(options: OptionsList): Promise<Genre[]>;
  create(data: CreateGenresDTO): Promise<Genre>;
}
