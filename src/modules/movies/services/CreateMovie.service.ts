import {
  MOVIES_REPOSITORY,
  GENRES_REPOSITORY,
  DIRECTORS_REPOSITORY,
  ACTORS_REPOSITORY,
} from '@/config/constants/repositories.constants';
import { IActorsRepository } from '@/modules/casts/repositories/ActorsRepository.interface';
import { IDirectorsRepository } from '@/modules/casts/repositories/DirectorsRepository.interface';
import { ConflictException, Inject, NotFoundException } from '@nestjs/common';

import { CreateMoviesDTO } from '../dtos/requests/CreateMovies.dto';
import { Movie } from '../infra/typeorm/entities/Movie.entity';
import { IGenresRepository } from '../repositories/IGenresRepository.interface';
import { IMoviesRepository } from '../repositories/IMoviesRepository.interface';

export class CreateMovieService {
  constructor(
    @Inject(MOVIES_REPOSITORY)
    private readonly moviesRepository: IMoviesRepository,
    @Inject(GENRES_REPOSITORY)
    private readonly genresRepository: IGenresRepository,
    @Inject(DIRECTORS_REPOSITORY)
    private readonly directorsRepository: IDirectorsRepository,
    @Inject(ACTORS_REPOSITORY)
    private readonly actorsRepository: IActorsRepository,
  ) {}

  async execute({
    name,
    description,
    author,
    duration,
    year,
    genreIds,
    actorIds,
    directorId,
  }: CreateMoviesDTO): Promise<Movie> {
    const uniqueGenresIds = [...new Set(genreIds)];
    const uniqueActorsIds = [...new Set(actorIds)];

    const searchGenres = await this.genresRepository.findByIds(genreIds);

    if (searchGenres.length !== uniqueGenresIds.length) {
      throw new NotFoundException('genres not found');
    }

    const searchActors = await this.actorsRepository.findByIds(actorIds);

    if (searchActors.length !== uniqueActorsIds.length) {
      throw new NotFoundException('actors not found');
    }

    const director = await this.directorsRepository.findById(directorId);

    if (!director) {
      throw new NotFoundException('director not found');
    }

    const movieExist = await this.moviesRepository.findByName(name);

    if (movieExist) {
      throw new ConflictException('Movie already exist');
    }

    return this.moviesRepository.create({
      name,
      description,
      author,
      duration,
      year,
      genres: searchGenres,
      actors: searchActors,
      directorId,
    });
  }
}
