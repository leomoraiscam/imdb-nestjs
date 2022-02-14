import { Genre } from '../infra/typeorm/entities/Genre.entity';

export interface ICreateMovieDTO {
  name: string;
  description: string;
  author: string;
  year: number;
  duration: string;
  genres: Genre[];
}
