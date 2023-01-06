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
} from '@nestjs/swagger';

import { Director } from '../../typeorm/entities/Direction.entity';

@ApiTags('Director')
@Controller('directors')
export class CreateDirectorsController {
  constructor(private readonly createDirectorService: CreateDirectorService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: Director,
    description: 'This will be returned when the created director',
  })
  @ApiBadRequestResponse({
    type: ValidationErrorDTO,
    description: 'This will be returned when has validation error',
  })
  @ApiConflictResponse({
    type: ExceptionErrorDTO,
    description: 'This will be returned when the director already exist',
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: 'This will be returned when an unexpected error occurs',
  })
  handle(@Body() { name, gender }: CreateDirectorDTO) {
    return this.createDirectorService.execute({
      name,
      gender,
    });
  }
}
