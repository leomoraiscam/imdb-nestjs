import { paginate } from '@/modules/movies/utils/paginateArrayInMemory';
import { v4 as uuid } from 'uuid';

import { CreateDirectorsDTO } from '../../dtos/requests/CreateDirectors.dto';
import { ListCastsDTO } from '../../dtos/requests/ListCasts.dto';
import { Director } from '../../infra/typeorm/entities/Direction.entity';
import { IDirectorsRepository } from '../DirectorsRepository.interface';

export class InMemoryDirectorsRepository implements IDirectorsRepository {
  private directors: Director[] = [];

  async findById(id: string): Promise<Director> {
    const allDirectors = this.directors.find((director) => director.id === id);

    return allDirectors;
  }

  public async findByName(name: string): Promise<Director> {
    return this.directors.find((director) => director.name === name);
  }

  async list({ page, perPage, name }: ListCastsDTO): Promise<Director[]> {
    page = page || 1;
    perPage = perPage || 10;

    let paginatedDirectors = paginate(this.directors, perPage, page);

    if (name) {
      paginatedDirectors = paginatedDirectors.filter(({ name }) =>
        name.includes(name),
      );
    }

    return paginatedDirectors;
  }

  public async create({ name, gender }: CreateDirectorsDTO): Promise<Director> {
    const director = new Director();

    Object.assign(director, { id: uuid(), name, gender });

    this.directors.push(director);

    return director;
  }

  public async save(director: Director): Promise<Director> {
    const findIndex = this.directors.findIndex(
      (directorData) => directorData.id === director.id,
    );

    this.directors[findIndex] = director;

    return director;
  }

  public async delete(id: string): Promise<void> {
    const fieldIndex = this.directors.findIndex(
      (directorData) => directorData.id === id,
    );

    this.directors.splice(fieldIndex, 1);
  }
}
