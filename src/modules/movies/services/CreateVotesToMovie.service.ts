import {
  MOVIES_REPOSITORY,
  VOTES_REPOSITORY,
} from '@/config/constants/repositories.constants';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IMoviesRepository } from 'src/modules/movies/repositories/IMoviesRepository.interface';

import { ICreateVotesDTO } from '../dtos/ICreateVotes.dto';
import { Vote } from '../infra/typeorm/entities/Vote.entity';
import { IVotesRepository } from '../repositories/IVotesRepository.interface';

@Injectable()
export class CreateVotesToMovieService {
  constructor(
    @Inject(MOVIES_REPOSITORY)
    private readonly moviesRepository: IMoviesRepository,
    @Inject(VOTES_REPOSITORY)
    private readonly votesRepository: IVotesRepository,
  ) {}

  async execute({ movieId, userId, note }: ICreateVotesDTO): Promise<Vote> {
    const movie = await this.moviesRepository.findById(movieId);

    if (!movie) {
      throw new NotFoundException('movie not found');
    }

    return this.votesRepository.create({
      movieId,
      note,
      userId,
    });
  }
}
