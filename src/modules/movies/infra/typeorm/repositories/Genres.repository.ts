import { CreateGenresDTO } from '@/modules/movies/dtos/requests/CreateGenres.dto';
import { ListGenresDTO } from '@/modules/movies/dtos/requests/ListGenres.dto';
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

  async list({ name, page, perPage }: ListGenresDTO): Promise<Genre[]> {
    const genresQuery = await this.repository
      .createQueryBuilder('genre')
      .take(perPage)
      .skip(perPage * (page - 1));

    if (name) {
      genresQuery.andWhere(`m.name like :name`, { name: `%${name}%` });
    }

    const genres = await genresQuery.getMany();

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
