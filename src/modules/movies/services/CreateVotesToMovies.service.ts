import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IMoviesRepository } from 'src/modules/movies/repositories/IMoviesRepository.interface';

import { ICreateVoteDTO } from '../dtos/ICreateVotes.dto';
import { Vote } from '../infra/typeorm/entities/Vote.entity';
import { IVotesRepository } from '../repositories/IVotesRepository.interface';

@Injectable()
export class CreateVotesToMoviesService {
  constructor(
    @Inject('MOVIE_REPOSITORY')
    private moviesRepository: IMoviesRepository,
    @Inject('VOTE_REPOSITORY')
    private votesRepository: IVotesRepository,
  ) {}

  async execute({ movieId, userId, note }: ICreateVoteDTO): Promise<Vote> {
    const movie = await this.moviesRepository.findById(movieId);

    if (!movie) {
      throw new NotFoundException('movie not found');
    }

    const vote = await this.votesRepository.create({
      movieId,
      note,
      userId,
    });

    return vote;
  }
}
