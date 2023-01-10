import { paginate } from '@/modules/movies/utils/paginateArrayInMemory';
import { v4 as uuid } from 'uuid';

import { CreateDirectorDTO } from '../../dtos/requests/CreateDirector.dto';
import { OptionsList } from '../../dtos/requests/OptionsToListData.dto';
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

  async list({ take, skip }: OptionsList): Promise<Director[]> {
    let data = [];

    take = take || 1;
    skip = skip || 10;

    const auxVar = this.directors;

    data = auxVar.map((director) => {
      const json = Object.assign({}, director);

      return json;
    });

    data = paginate(data, skip, take);

    return data;
  }

  public async create({ name, gender }: CreateDirectorDTO): Promise<Director> {
    const director = new Director();

    Object.assign(director, { id: uuid(), name, gender });

    this.directors.push(director);

    return director;
  }
}
