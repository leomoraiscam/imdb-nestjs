import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateGenreDTO } from '../../../dtos/CreateGenre.dto';
import { IGenresRepository } from '../../../repositories/IGenresRepository.interface';
import { Genre } from '../../typeorm/entities/Genre.entity';

export class GenresRepository implements IGenresRepository {
  constructor(
    @InjectRepository(Genre)
    private repository: Repository<Genre>,
  ) {}

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

  async create({ name, description }: CreateGenreDTO): Promise<Genre> {
    const genre = this.repository.create({
      name,
      description,
    });

    await this.repository.save(genre);

    return genre;
  }
}
