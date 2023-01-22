import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

import { CreateGenresDTO } from './CreateGenres.dto';

export class UpdateGenreDTO extends PartialType(CreateGenresDTO) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  genreId?: string;
}
