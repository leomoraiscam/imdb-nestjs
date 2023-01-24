import { ICreateVotesDTO } from '../dtos/ICreateVotes.dto';
import { IFindVotesByUserAndMovieIdsDTO } from '../dtos/IFindVotesByUserAndMovieIds.dto';
import { Vote } from '../infra/typeorm/entities/Vote.entity';

export interface IVotesRepository {
  findVoteByUserAndMovie(data: IFindVotesByUserAndMovieIdsDTO): Promise<Vote>;
  create(data: ICreateVotesDTO): Promise<Vote>;
  save(data: Vote): Promise<Vote>;
}
