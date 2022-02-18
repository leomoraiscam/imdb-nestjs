import { Inject } from '@nestjs/common';

import { IOptionsList } from '../dtos/IOptionsToListMovie.dto';
import { Movie } from '../infra/typeorm/entities/Movie.entity';
import { IMoviesRepository } from '../repositories/IMoviesRepository.interface';

export class ListMoviesServices {
  constructor(
    @Inject('MOVIE_REPOSITORY')
    private movieRepository: IMoviesRepository,
  ) {}

  async execute({
    name,
    author,
    genre_id,
    page,
    skip,
    take,
  }: IOptionsList): Promise<Movie[]> {
    return this.movieRepository.list({
      name,
      author,
      genre_id,
      page,
      skip,
      take,
    });
  }
}
