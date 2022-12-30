import { OptionsList } from '@/modules/movies/dtos/requests/OptionsToListMovie.dto';
import { ListMoviesServices } from '@/modules/movies/services/ListMovies.service';
import { ExceptionErrorDTO } from '@/shared/errors/dtos/exceptionError.dto';
import { CheckEmptyListInterceptor } from '@/shared/interceptors/checkEmptyList.interceptor';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { classToClass } from 'class-transformer';

import { Movie } from '../../typeorm/entities/Movie.entity';

@ApiTags('Movies')
@Controller('movies')
export class ListMoviesController {
  constructor(private readonly listMoviesServices: ListMoviesServices) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Movie })
  @ApiNoContentResponse({
    description: 'This will be returned when the receive empty list',
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: 'This will be returned when an unexpected error occurs',
  })
  @UseInterceptors(new CheckEmptyListInterceptor())
  public async handle(
    @Query() { name, author, genreIds, take, skip, page }: OptionsList,
  ) {
    const movies = await this.listMoviesServices.execute({
      name,
      author,
      genreIds,
      take,
      skip,
      page,
    });

    return classToClass(movies);
  }
}
