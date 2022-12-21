import { v4 as uuidv4 } from 'uuid';

import { CreateGenresDTO } from '../../dtos/requests/CreateGenres.dto';
import { Genre } from '../../infra/typeorm/entities/Genre.entity';
import { IGenresRepository } from '../IGenresRepository.interface';

export class InMemoryGenresRepository implements IGenresRepository {
  private genres: Genre[] = [];

  async findByIds(ids: string[]): Promise<Genre[]> {
    const allGenres = this.genres.filter((genre) => ids.includes(genre.id));

    return allGenres;
  }

  async findByName(name: string): Promise<Genre | undefined> {
    return this.genres.find((genre) => genre.name === name);
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
}
