import { CreateGenresDTO } from '../dtos/requests/CreateGenres.dto';
import { Genre } from '../infra/typeorm/entities/Genre.entity';

export interface IGenresRepository {
  findByIds(ids: string[]): Promise<Genre[]>;
  findByName(name: string): Promise<Genre | undefined>;
  create(data: CreateGenresDTO): Promise<Genre>;
}
