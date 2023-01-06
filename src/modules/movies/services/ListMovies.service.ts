import { Inject } from '@nestjs/common';

import { ISerializedResponse } from '../dtos/ISerializedMovies.dto';
import { OptionsList } from '../dtos/requests/OptionsToListMovie.dto';
import { Movie } from '../infra/typeorm/entities/Movie.entity';
import { IMoviesRepository } from '../repositories/IMoviesRepository.interface';

export class ListMoviesServices {
  constructor(
    @Inject('MOVIE_REPOSITORY')
    private readonly movieRepository: IMoviesRepository,
  ) {}

  async execute({
    name,
    author,
    genreIds,
    take = 10,
    page = 1,
    skip = 0,
  }: OptionsList): Promise<ISerializedResponse[] | Movie[]> {
    const movies = await this.movieRepository.list({
      name,
      author,
      genreIds,
      page,
      skip,
      take,
    });

    return movies.map((item) => {
      const average = item.votes.reduce(function (accumulator, object) {
        return accumulator + object.note / item.votes.length;
      }, 0);

      return {
        ...item,
        average,
      };
    });
  }
}
