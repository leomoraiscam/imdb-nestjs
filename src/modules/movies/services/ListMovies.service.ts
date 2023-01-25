import { MOVIES_REPOSITORY } from '@/config/constants/repositories.constants';
import { Inject } from '@nestjs/common';

import { IListMoviesDTO } from '../dtos/IListMovies.dto';
import { OptionsList } from '../dtos/requests/OptionsToListMovie.dto';
import { Movie } from '../infra/typeorm/entities/Movie.entity';
import { IMoviesRepository } from '../repositories/IMoviesRepository.interface';

export class ListMoviesServices {
  constructor(
    @Inject(MOVIES_REPOSITORY)
    private readonly moviesRepository: IMoviesRepository,
  ) {}

  async execute({
    name,
    author,
    genreIds,
    take = 10,
    page = 1,
    skip = 0,
  }: OptionsList): Promise<IListMoviesDTO[] | Movie[]> {
    const movies = await this.moviesRepository.list({
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
