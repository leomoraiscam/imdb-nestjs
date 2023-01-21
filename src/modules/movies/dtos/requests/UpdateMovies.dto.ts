import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

import { CreateMoviesDTO } from './CreateMovies.dto';

export class UpdateMoviesDTO extends PartialType(CreateMoviesDTO) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  movieId?: string;
}
