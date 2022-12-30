import { ConflictException, Inject } from '@nestjs/common';

import { CreateGenresDTO } from '../dtos/requests/CreateGenres.dto';
import { Genre } from '../infra/typeorm/entities/Genre.entity';
import { IGenresRepository } from '../repositories/IGenresRepository.interface';

export class CreateGenreService {
  constructor(
    @Inject('GENRE_REPOSITORY')
    private readonly genresRepository: IGenresRepository,
  ) {}

  async execute({ name, description }: CreateGenresDTO): Promise<Genre> {
    const genreExist = await this.genresRepository.findByName(name);

    if (genreExist) {
      throw new ConflictException('genre already exist');
    }

    const genre = await this.genresRepository.create({
      name,
      description,
    });

    return genre;
  }
}
