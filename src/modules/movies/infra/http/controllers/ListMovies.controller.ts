import { Controller, HttpCode, HttpStatus, Get, Query } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { classToClass } from 'class-transformer';
import { ExceptionErrorDTO } from 'src/shared/errors/dtos/exceptionError.dto';

import { IOptionsList } from '../../../dtos/IOptionsToListMovie.dto';
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
  public async handle(
    @Query() { name, author, genre_id, take, skip, page }: IOptionsList,
  ) {
    const movies = await this.listMoviesServices.execute({
      name,
      author,
      genre_id,
      take,
      skip,
      page,
    });

    return classToClass(movies);
  }
}
