import { ICreateVotesDTO } from '../dtos/ICreateVotes.dto';
import { Vote } from '../infra/typeorm/entities/Vote.entity';

export interface IVotesRepository {
  create(data: ICreateVotesDTO): Promise<Vote>;
}
