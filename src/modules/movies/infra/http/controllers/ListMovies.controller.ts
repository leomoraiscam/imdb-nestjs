import { MOVIES } from '@/config/constants/resourceTags.constants';
import {
  OK_RESPONSE,
  NO_CONTENT_RESPONSE,
  INTERNAL_SERVER_ERROR,
} from '@/config/constants/responses.constant';
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

import { Movie } from '../../typeorm/entities/Movie.entity';

@ApiTags(MOVIES)
@Controller(MOVIES.toLowerCase())
export class ListMoviesController {
  constructor(private readonly listMoviesServices: ListMoviesServices) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Movie, description: OK_RESPONSE })
  @ApiNoContentResponse({
    description: NO_CONTENT_RESPONSE,
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: INTERNAL_SERVER_ERROR,
  })
  @UseInterceptors(new CheckEmptyListInterceptor())
  handle(@Query() { name, author, genreIds, take, skip, page }: OptionsList) {
    return this.listMoviesServices.execute({
      name,
      author,
      genreIds,
      take,
      skip,
      page,
    });
  }
}
