import { CreateGenresDTO } from '../dtos/requests/CreateGenres.dto';
import { ListGenresDTO } from '../dtos/requests/ListGenres.dto';
import { Genre } from '../infra/typeorm/entities/Genre.entity';

export interface IGenresRepository {
  findById(id: string): Promise<Genre>;
  findByIds(ids: string[]): Promise<Genre[]>;
  findByName(name: string): Promise<Genre | undefined>;
  list(options?: ListGenresDTO): Promise<Genre[]>;
  create(data: CreateGenresDTO): Promise<Genre>;
  save(genre: Genre): Promise<Genre>;
  delete(id: string): Promise<void>;
}
