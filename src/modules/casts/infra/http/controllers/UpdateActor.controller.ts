import { ACTORS } from '@/config/constants/resourceTags.constants';
import {
  BAD_REQUEST_RESPONSE,
  CONFLICT_RESPONSE,
  INTERNAL_SERVER_ERROR,
  OK_RESPONSE,
  UNAUTHORIZED_RESPONSE,
} from '@/config/constants/responses.constant';
import { UpdateActorsDTO } from '@/modules/casts/dtos/requests/UpdateActors.dto';
import { UpdateActorService } from '@/modules/casts/services/UpdateActor.service';
import { ExceptionErrorDTO } from '@/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from '@/shared/errors/dtos/validationError.dto';
import { JwtAuthGuard } from '@/shared/infra/http/guards/jwtAuth.guard';
import { Controller, Put, Body, UseGuards, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

import { Actor } from '../../typeorm/entities/Actor.entity';

@ApiTags(ACTORS)
@Controller(ACTORS.toLowerCase())
export class UpdateActorController {
  constructor(private readonly updateActorService: UpdateActorService) {}

  @Put(':id')
  @ApiOkResponse({ type: Actor, description: OK_RESPONSE })
  @ApiBadRequestResponse({
    type: ValidationErrorDTO,
    description: BAD_REQUEST_RESPONSE,
  })
  @ApiUnauthorizedResponse({
    type: ExceptionErrorDTO,
    description: UNAUTHORIZED_RESPONSE,
  })
  @ApiConflictResponse({
    type: ExceptionErrorDTO,
    description: CONFLICT_RESPONSE,
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: INTERNAL_SERVER_ERROR,
  })
  @UseGuards(JwtAuthGuard)
  handle(@Body() updateActorDTO: UpdateActorsDTO, @Param('id') id: string) {
    const { gender, name } = updateActorDTO;

    return this.updateActorService.execute({
      actorId: id,
      gender,
      name,
    });
  }
}
