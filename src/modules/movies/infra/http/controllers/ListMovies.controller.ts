import { Controller, HttpCode, HttpStatus, Get } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { classToClass } from 'class-transformer';
import { ExceptionErrorDTO } from 'src/shared/errors/dtos/exceptionError.dto';

import { ListMoviesServices } from '../../../services/ListMovies.service';
import { Movie } from '../../typeorm/entities/Movie.entity';

@ApiTags('Movies')
@Controller('movies')
export class ListMoviesController {
  constructor(private listMoviesServices: ListMoviesServices) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Movie })
  @ApiNotFoundResponse({
    type: ExceptionErrorDTO,
    description:
      'This will be returned when the interest to be deleted does not exist',
  })
  @ApiUnprocessableEntityResponse({
    type: ExceptionErrorDTO,
    description:
      'This will be returned when some fields did not came the way we needed',
  })
  public async handle() {
    const terms = this.listMoviesServices.execute();

    return classToClass(terms);
  }
}
