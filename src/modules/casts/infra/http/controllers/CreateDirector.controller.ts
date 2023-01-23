import { DIRECTORS } from '@/config/constants/resourceTags.constants';
import {
  BAD_REQUEST_RESPONSE,
  CONFLICT_RESPONSE,
  CREATED_RESPONSE,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED_RESPONSE,
} from '@/config/constants/responses.constant';
import { CreateDirectorDTO } from '@/modules/casts/dtos/requests/CreateDirector.dto';
import { CreateDirectorService } from '@/modules/casts/services/CreateDirector.service';
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

import { Director } from '../../typeorm/entities/Direction.entity';
@ApiTags(DIRECTORS)
@Controller(DIRECTORS.toLowerCase())
export class CreateDirectorController {
  constructor(private readonly createDirectorService: CreateDirectorService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: Director,
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
  handle(@Body() { name, gender }: CreateDirectorDTO) {
    return this.createDirectorService.execute({
      name,
      gender,
    });
  }
}
