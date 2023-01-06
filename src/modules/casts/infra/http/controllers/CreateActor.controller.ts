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
} from '@nestjs/swagger';

import { Actor } from '../../typeorm/entities/Actor.entity';

@ApiTags('Actors')
@Controller('actors')
export class CreateActorsController {
  constructor(private readonly createActorService: CreateActorService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: Actor,
    description: 'This will be returned when the created actor',
  })
  @ApiBadRequestResponse({
    type: ValidationErrorDTO,
    description: 'This will be returned when has validation error',
  })
  @ApiConflictResponse({
    type: ExceptionErrorDTO,
    description: 'This will be returned when the actor already exist',
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: 'This will be returned when an unexpected error occurs',
  })
  handle(@Body() { name, gender }: CreateActorDTO) {
    return this.createActorService.execute({
      name,
      gender,
    });
  }
}
