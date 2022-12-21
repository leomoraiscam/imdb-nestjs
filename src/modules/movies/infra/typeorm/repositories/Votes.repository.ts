import { IVotesRepository } from '@/modules/movies/repositories/IVotesRepository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ICreateVoteDTO } from '../../../dtos/ICreateVotes.dto';
import { Vote } from '../entities/Vote.entity';

@Injectable()
export class VotesRepository implements IVotesRepository {
  constructor(
    @InjectRepository(Vote)
    private repository: Repository<Vote>,
  ) {}

  async create({ userId, movieId, note }: ICreateVoteDTO): Promise<Vote> {
    const vote = this.repository.create({
      userId,
      movieId,
      note,
    });

    await this.repository.save(vote);

    return vote;
  }
}
