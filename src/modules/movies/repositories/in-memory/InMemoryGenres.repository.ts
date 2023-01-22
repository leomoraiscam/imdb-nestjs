import { v4 as uuidv4 } from 'uuid';

import { CreateGenresDTO } from '../../dtos/requests/CreateGenres.dto';
import { OptionsList } from '../../dtos/requests/OptionsToListMovie.dto';
import { Genre } from '../../infra/typeorm/entities/Genre.entity';
import { paginate } from '../../utils/paginateArrayInMemory';
import { IGenresRepository } from '../IGenresRepository.interface';

export class InMemoryGenresRepository implements IGenresRepository {
  private genres: Genre[] = [];

  async findById(id: string): Promise<Genre> {
    return this.genres.find((genre) => genre.id === id);
  }

  async findByIds(ids: string[]): Promise<Genre[]> {
    const allGenres = this.genres.filter((genre) => ids.includes(genre.id));

    return allGenres;
  }

  async findByName(name: string): Promise<Genre | undefined> {
    return this.genres.find((genre) => genre.name === name);
  }

  async list({ take, skip }: OptionsList): Promise<Genre[]> {
    let data = [];

    take = take || 1;
    skip = skip || 10;

    const auxVar = this.genres;

    data = auxVar.map((term) => {
      const json = Object.assign({}, term);
      return json;
    });

    data = paginate(data, skip, take);

    return data;
  }

  async create({ name, description }: CreateGenresDTO): Promise<Genre> {
    const genre = new Genre();

    Object.assign(genre, {
      id: uuidv4(),
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.genres.push(genre);

    return genre;
  }

  async save(genre: Genre): Promise<Genre> {
    const findIndex = this.genres.findIndex(
      (genreData) => genreData.id === genre.id,
    );

    this.genres[findIndex] = genre;

    return genre;
  }

  public async delete(id: string): Promise<void> {
    const fieldIndex = this.genres.findIndex(
      (genreData) => genreData.id === id,
    );

    this.genres.splice(fieldIndex, 1);
  }
}
