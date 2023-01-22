import { CreateGenresDTO } from '@/modules/movies/dtos/requests/CreateGenres.dto';
import { OptionsList } from '@/modules/movies/dtos/requests/OptionsToListMovie.dto';
import { IGenresRepository } from '@/modules/movies/repositories/IGenresRepository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Genre } from '../../typeorm/entities/Genre.entity';

export class GenresRepository implements IGenresRepository {
  constructor(
    @InjectRepository(Genre)
    private repository: Repository<Genre>,
  ) {}

  async findById(id: string): Promise<Genre> {
    return this.repository.findOne(id);
  }

  async findByIds(ids: string[]): Promise<Genre[]> {
    const allGenres = this.repository.findByIds(ids);

    return allGenres;
  }

  async findByName(name: string): Promise<Genre | undefined> {
    return this.repository.findOne({
      where: {
        name,
      },
    });
  }

  async list({ name, take, page }: OptionsList): Promise<Genre[]> {
    const moviesQuery = await this.repository
      .createQueryBuilder('m')
      .take(take)
      .skip(take * (page - 1));

    if (name) {
      moviesQuery.andWhere(`m.name = :name`, { name });
    }

    const genres = await moviesQuery.getMany();

    return genres;
  }

  async create({ name, description }: CreateGenresDTO): Promise<Genre> {
    const genre = this.repository.create({
      name,
      description,
    });

    await this.repository.save(genre);

    return genre;
  }

  async save(genre: Genre): Promise<Genre> {
    return this.repository.save(genre);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
