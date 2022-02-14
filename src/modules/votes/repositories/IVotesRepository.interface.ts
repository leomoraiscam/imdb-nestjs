import { ICreateVoteDTO } from '../dtos/ICreateVotes.dto';
import { Vote } from '../infra/typeorm/entities/Vote.entity';

export interface IVotesRepository {
  create(data: ICreateVoteDTO): Promise<Vote>;
}
