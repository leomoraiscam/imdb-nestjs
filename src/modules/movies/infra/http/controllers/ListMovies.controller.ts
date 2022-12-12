import { Controller, HttpCode, HttpStatus, Get, Query } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { classToClass } from 'class-transformer';
import { ExceptionErrorDTO } from 'src/shared/errors/dtos/exceptionError.dto';

import { OptionsList } from '../../../dtos/IOptionsToListMovie.dto';
import { ListMoviesServices } from '../../../services/ListMovies.service';
import { Movie } from '../../typeorm/entities/Movie.entity';

@ApiTags('Movies')
@Controller('movies')
export class ListMoviesController {
  constructor(private listMoviesServices: ListMoviesServices) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Movie })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: 'This will be returned when an unexpected error occurs',
  })
  public async handle(
    @Query() { name, author, genre_id, take, skip, page }: OptionsList,
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
