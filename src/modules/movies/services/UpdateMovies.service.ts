import { MOVIES_REPOSITORY } from '@/config/constants/repositories.constants';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateMoviesDTO } from '../dtos/requests/UpdateMovies.dto';
import { Genre } from '../infra/typeorm/entities/Genre.entity';
import { IMoviesRepository } from '../repositories/IMoviesRepository.interface';

@Injectable()
export class UpdateMovieService {
  constructor(
    @Inject(MOVIES_REPOSITORY)
    private readonly moviesRepository: IMoviesRepository,
  ) {}

  public async execute({
    movieId,
    name,
    description,
    directorId,
    duration,
    author,
    genreIds,
    actorIds,
    year,
  }: UpdateMoviesDTO): Promise<Genre> {
    const movie = await this.moviesRepository.findById(movieId);

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    const movieWithUpdatedName = await this.moviesRepository.findByName(name);

    if (movieWithUpdatedName && movieWithUpdatedName.id !== movieId) {
      throw new ConflictException('Movie name already in use');
    }

    Object.assign(movie, {
      name,
      description,
      directorId,
      duration,
      author,
      genreIds,
      actorIds,
      year,
    });

    return this.moviesRepository.save(movie);
  }
}
