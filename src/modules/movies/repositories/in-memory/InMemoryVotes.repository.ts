import { v4 as uuidv4 } from 'uuid';

import { ICreateVotesDTO } from '../../dtos/ICreateVotes.dto';
import { Vote } from '../../infra/typeorm/entities/Vote.entity';

export class InMemoryVotesRepository {
  private votes: Vote[] = [];

  async create({ userId, movieId, note }: ICreateVotesDTO): Promise<Vote> {
    const vote = new Vote();

    Object.assign(vote, {
      id: uuidv4(),
      userId,
      movieId,
      note,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.votes.push(vote);

    return vote;
  }
}
