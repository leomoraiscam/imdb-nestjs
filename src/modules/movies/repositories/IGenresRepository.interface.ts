import { CreateGenreDTO } from '../dtos/CreateGenre.dto';
import { Genre } from '../infra/typeorm/entities/Genre.entity';

export interface IGenresRepository {
  findByIds(ids: string[]): Promise<Genre[]>;
  findByName(name: string): Promise<Genre | undefined>;
  create(data: CreateGenreDTO): Promise<Genre>;
}
