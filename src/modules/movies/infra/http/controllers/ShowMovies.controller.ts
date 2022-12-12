import { Controller, HttpCode, HttpStatus, Get, Param } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { classToClass } from 'class-transformer';
import { ExceptionErrorDTO } from 'src/shared/errors/dtos/exceptionError.dto';

import { ShowMoviesServices } from '../../../services/ShowMovies.service';
import { Movie } from '../../typeorm/entities/Movie.entity';

@ApiTags('Movies')
@Controller('movies')
export class ShowMoviesController {
  constructor(private showMoviesServices: ShowMoviesServices) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Movie })
  @ApiNotFoundResponse({
    type: ExceptionErrorDTO,
    description:
      'This will be returned when the interest to be deleted does not exist',
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: 'This will be returned when an unexpected error occurs',
  })
  public async handle(@Param('id') id: string) {
    const movie = await this.showMoviesServices.execute(id);

    return classToClass(movie);
  }
}
