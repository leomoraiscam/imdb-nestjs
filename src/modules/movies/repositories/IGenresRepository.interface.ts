import { ICreateGenreDTO } from '../dtos/ICreateGenre.dto';
import { Genre } from '../infra/typeorm/entities/Genre.entity';

export interface IGenresRepository {
  findByIds(ids: string[]): Promise<Genre[]>;
  findByName(name: string): Promise<Genre | undefined>;
  create(data: ICreateGenreDTO): Promise<Genre>;
}
