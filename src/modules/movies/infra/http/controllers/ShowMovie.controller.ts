import { MOVIES } from '@/config/constants/resourceTags.constants';
import {
  OK_RESPONSE,
  NOT_FOUND_RESPONSE,
  INTERNAL_SERVER_ERROR,
} from '@/config/constants/responses.constant';
import { ShowMovieService } from '@/modules/movies/services/ShowMovie.service';
import { ExceptionErrorDTO } from '@/shared/errors/dtos/exceptionError.dto';
import { Controller, HttpCode, HttpStatus, Get, Param } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Movie } from '../../typeorm/entities/Movie.entity';

@ApiTags(MOVIES)
@Controller(MOVIES.toLowerCase())
export class ShowMovieController {
  constructor(private readonly showMovieServices: ShowMovieService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Movie, description: OK_RESPONSE })
  @ApiNotFoundResponse({
    type: ExceptionErrorDTO,
    description: NOT_FOUND_RESPONSE,
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: INTERNAL_SERVER_ERROR,
  })
  handle(@Param('id') id: string) {
    return this.showMovieServices.execute(id);
  }
}
