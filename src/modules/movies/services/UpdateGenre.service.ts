import { GENRES_REPOSITORY } from '@/config/constants/repositories.constants';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateGenreDTO } from '../dtos/requests/UpdateGenres.dto';
import { Genre } from '../infra/typeorm/entities/Genre.entity';
import { IGenresRepository } from '../repositories/IGenresRepository.interface';

@Injectable()
export class UpdateGenreService {
  constructor(
    @Inject(GENRES_REPOSITORY)
    private readonly genresRepository: IGenresRepository,
  ) {}

  public async execute({
    description,
    genreId,
    name,
  }: UpdateGenreDTO): Promise<Genre> {
    const genre = await this.genresRepository.findById(genreId);

    if (!genre) {
      throw new NotFoundException('Genre not found');
    }

    const genreWithUpdatedName = await this.genresRepository.findByName(name);

    if (genreWithUpdatedName && genreWithUpdatedName.id !== genreId) {
      throw new ConflictException('Genre name already in use');
    }

    Object.assign(genre, { name, description });

    return this.genresRepository.save(genre);
  }
}
