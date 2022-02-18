import { Inject } from '@nestjs/common';

import { IOptionsList } from '../dtos/IOptionsToListMovie.dto';
import { ISerializedResponse } from '../dtos/ISerializedMovies.dto';
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
  }: IOptionsList): Promise<ISerializedResponse[]> {
    const movies = await this.movieRepository.list({
      name,
      author,
      genre_id,
      page,
      skip,
      take,
    });

    const serializedMovies = movies.map((movie) => {
      let averageValue = null;

      const notes = movie.votes.map((vote) => vote.note);

      if (notes.length) {
        averageValue = notes?.reduce((prev, acc) => prev + acc / notes.length);
      }

      const resultSerialized = {
        ...movie,
        average: averageValue,
      };

      return resultSerialized;
    });

    return serializedMovies;
  }
}
