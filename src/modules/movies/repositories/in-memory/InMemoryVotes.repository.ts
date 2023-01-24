import { v4 as uuidv4 } from 'uuid';

import { ICreateVotesDTO } from '../../dtos/ICreateVotes.dto';
import { IFindVotesByUserAndMovieIdsDTO } from '../../dtos/IFindVotesByUserAndMovieIds.dto';
import { Vote } from '../../infra/typeorm/entities/Vote.entity';
import { IVotesRepository } from '../IVotesRepository.interface';

export class InMemoryVotesRepository implements IVotesRepository {
  private votes: Vote[] = [];

  async findVoteByUserAndMovie({
    movieId,
    userId,
  }: IFindVotesByUserAndMovieIdsDTO): Promise<Vote> {
    return this.votes.find(
      (vote) => vote.userId === userId && vote.movieId === movieId,
    );
  }

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

  async save(vote: Vote): Promise<Vote> {
    const findIndex = this.votes.findIndex(
      (voteData) => voteData.id === vote.id,
    );

    this.votes[findIndex] = vote;

    return vote;
  }
}
