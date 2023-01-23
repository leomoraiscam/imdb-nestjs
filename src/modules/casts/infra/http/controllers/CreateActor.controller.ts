import { ACTORS } from '@/config/constants/resourceTags.constants';
import {
  BAD_REQUEST_RESPONSE,
  CONFLICT_RESPONSE,
  CREATED_RESPONSE,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED_RESPONSE,
} from '@/config/constants/responses.constant';
import { CreateActorDTO } from '@/modules/casts/dtos/requests/CreateActor.dto';
import { CreateActorService } from '@/modules/casts/services/CreateActor.service';
import { ExceptionErrorDTO } from '@/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from '@/shared/errors/dtos/validationError.dto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Actor } from '../../typeorm/entities/Actor.entity';

@ApiTags(ACTORS)
@Controller(ACTORS.toLowerCase())
export class CreateActorController {
  constructor(private readonly createActorService: CreateActorService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: Actor,
    description: CREATED_RESPONSE,
  })
  @ApiBadRequestResponse({
    type: ValidationErrorDTO,
    description: BAD_REQUEST_RESPONSE,
  })
  @ApiUnauthorizedResponse({
    type: ValidationErrorDTO,
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
  handle(@Body() { name, gender }: CreateActorDTO) {
    return this.createActorService.execute({
      name,
      gender,
    });
  }
}
