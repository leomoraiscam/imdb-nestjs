import { CreateGenresDTO } from '@/modules/movies/dtos/requests/CreateGenres.dto';
import { CreateGenreService } from '@/modules/movies/services/CreateGenre.service';
import { ExceptionErrorDTO } from '@/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from '@/shared/errors/dtos/validationError.dto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

import { Genre } from '../../typeorm/entities/Genre.entity';

@ApiTags('Genres')
@Controller('genres')
export class CreateGenresController {
  constructor(private createGenreService: CreateGenreService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: Genre,
    description: 'This will be returned when the created genre',
  })
  @ApiBadRequestResponse({
    type: ValidationErrorDTO,
    description: 'This will be returned when has validation error',
  })
  @ApiUnauthorizedResponse({
    type: ValidationErrorDTO,
    description:
      'This will be return when client doesnt provide Authorization Cookie',
  })
  @ApiConflictResponse({
    type: ExceptionErrorDTO,
    description: 'This will be returned when the name is already in use',
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: 'This will be returned when an unexpected error occurs',
  })
  async handle(
    @Body()
    { name, description }: CreateGenresDTO,
  ): Promise<Genre> {
    return this.createGenreService.execute({
      name,
      description,
    });
  }
}
