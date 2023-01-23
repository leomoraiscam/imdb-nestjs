import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { CreateActorsDTO } from './CreateActors.dto';

export class UpdateActorsDTO extends PartialType(CreateActorsDTO) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  actorId?: string;
}
