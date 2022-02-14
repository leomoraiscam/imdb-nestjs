import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { classToClass } from 'class-transformer';
import { ExceptionErrorDTO } from 'src/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from 'src/shared/errors/dtos/validationError.dto';

import { ICreateGenreDTO } from '../../../dtos/ICreateGenre.dto';
import { CreateGenreService } from '../../../services/CreateGenre.service';
import { Genre } from '../../typeorm/entities/Genre.entity';

@ApiTags('Genres')
@Controller('genres')
export class GenresController {
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
  @ApiConflictResponse({
    type: ExceptionErrorDTO,
    description: 'This will be returned when the email is already in use',
  })
  async create(
    @Body()
    { name, description }: ICreateGenreDTO,
  ): Promise<Genre> {
    const genre = this.createGenreService.execute({
      name,
      description,
    });

    return classToClass(genre);
  }
}
