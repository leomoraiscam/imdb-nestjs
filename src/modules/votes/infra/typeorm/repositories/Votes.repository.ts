import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IVotesRepository } from 'src/modules/votes/repositories/IVotesRepository.interface';
import { Repository } from 'typeorm';

import { ICreateVoteDTO } from '../../../dtos/ICreateVotes.dto';
import { Vote } from '../entities/Vote.entity';

@Injectable()
export class VotesRepository implements IVotesRepository {
  constructor(
    @InjectRepository(Vote)
    private repository: Repository<Vote>,
  ) {}

  async create({ user_id, movie_id, note }: ICreateVoteDTO): Promise<Vote> {
    const vote = this.repository.create({
      user_id,
      movie_id,
      note,
    });

    await this.repository.save(vote);

    return vote;
  }
}
