import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { CreateActorDTO } from './CreateActor.dto';

export class UpdateActorDTO extends PartialType(CreateActorDTO) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  actorId?: string;
}
