import { Inject } from '@nestjs/common';

import { OptionsList } from '../dtos/IOptionsToListMovie.dto';
import { ISerializedResponse } from '../dtos/ISerializedMovies.dto';
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
    take = 10,
    page = 1,
    skip = 0,
  }: OptionsList): Promise<ISerializedResponse[] | Movie[]> {
    const movies = await this.movieRepository.list({
      name,
      author,
      genre_id,
      page: Number(page),
      skip: Number(skip),
      take: Number(take),
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
