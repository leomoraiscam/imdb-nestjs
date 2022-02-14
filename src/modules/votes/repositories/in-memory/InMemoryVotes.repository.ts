import { v4 as uuidv4 } from 'uuid';

import { ICreateVoteDTO } from '../../dtos/ICreateVotes.dto';
import { Vote } from '../../infra/typeorm/entities/Vote.entity';

export class InMemoryVotesRepository {
  private votes: Vote[] = [];

  async create({ user_id, movie_id, note }: ICreateVoteDTO): Promise<Vote> {
    const vote = new Vote();

    Object.assign(vote, {
      id: uuidv4(),
      user_id,
      movie_id,
      note,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.votes.push(vote);

    return vote;
  }
}
