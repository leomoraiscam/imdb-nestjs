import { ConflictException, Inject, NotFoundException } from '@nestjs/common';

import { CreateMoviesDTO } from '../dtos/requests/CreateMovies.dto';
import { Movie } from '../infra/typeorm/entities/Movie.entity';
import { IGenresRepository } from '../repositories/IGenresRepository.interface';
import { IMoviesRepository } from '../repositories/IMoviesRepository.interface';

export class CreateMovieService {
  constructor(
    @Inject('MOVIE_REPOSITORY')
    private moviesRepository: IMoviesRepository,
    @Inject('GENRE_REPOSITORY')
    private genresRepository: IGenresRepository,
  ) {}

  async execute({
    name,
    description,
    author,
    duration,
    year,
    genreIds,
  }: CreateMoviesDTO): Promise<Movie> {
    const uniqueGenresIds = [...new Set(genreIds)];

    const searchGenres = await this.genresRepository.findByIds(genreIds);

    if (searchGenres.length !== uniqueGenresIds.length) {
      throw new NotFoundException('genres not found');
    }

    const movieExist = await this.moviesRepository.findByName(name);

    if (movieExist) {
      throw new ConflictException('Movie already exist');
    }

    const movie = await this.moviesRepository.create({
      name,
      description,
      author,
      duration,
      year,
      genres: searchGenres,
    });

    return movie;
  }
}
