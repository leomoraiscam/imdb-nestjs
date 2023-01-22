import { Actor } from '@/modules/casts/infra/typeorm/entities/Actor.entity';

import { Genre } from '../infra/typeorm/entities/Genre.entity';
import { Vote } from '../infra/typeorm/entities/Vote.entity';

export interface ICreateMovieDTO {
  name: string;
  description: string;
  author: string;
  year: number;
  duration: string;
  genres: Genre[];
  actors: Actor[];
  directorId?: string;
  votes?: Vote[];
}
