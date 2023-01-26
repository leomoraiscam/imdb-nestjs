import { MOVIES_REPOSITORY } from '@/config/constants/repositories.constants';
import { Inject } from '@nestjs/common';

import { IListMoviesDTO } from '../dtos/IListMovies.dto';
import { ListMoviesDTO } from '../dtos/requests/ListMovies.dto';
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
    page = 1,
    perPage = 10,
    keyword,
  }: ListMoviesDTO): Promise<IListMoviesDTO[] | Movie[]> {
    keyword = keyword || '';

    const movies = await this.moviesRepository.list({
      name,
      author,
      genreIds,
      page,
      perPage,
      keyword,
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
