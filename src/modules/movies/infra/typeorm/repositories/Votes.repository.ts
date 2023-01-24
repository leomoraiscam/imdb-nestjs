import { IFindVotesByUserAndMovieIdsDTO } from '@/modules/movies/dtos/IFindVotesByUserAndMovieIds.dto';
import { IVotesRepository } from '@/modules/movies/repositories/IVotesRepository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ICreateVotesDTO } from '../../../dtos/ICreateVotes.dto';
import { Vote } from '../entities/Vote.entity';

@Injectable()
export class VotesRepository implements IVotesRepository {
  constructor(
    @InjectRepository(Vote)
    private repository: Repository<Vote>,
  ) {}

  findVoteByUserAndMovie({
    movieId,
    userId,
  }: IFindVotesByUserAndMovieIdsDTO): Promise<Vote> {
    return this.repository.findOne({
      where: {
        movieId,
        userId,
      },
    });
  }

  async create({ userId, movieId, note }: ICreateVotesDTO): Promise<Vote> {
    const vote = this.repository.create({
      userId,
      movieId,
      note,
    });

    await this.repository.save(vote);

    return vote;
  }

  async save(data: Vote): Promise<Vote> {
    return this.repository.save(data);
  }
}
