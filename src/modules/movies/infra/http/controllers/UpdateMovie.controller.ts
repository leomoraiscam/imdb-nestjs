import { MOVIES } from '@/config/constants/resourceTags.constants';
import {
  OK_RESPONSE,
  UNAUTHORIZED_RESPONSE,
  BAD_REQUEST_RESPONSE,
  CONFLICT_RESPONSE,
  INTERNAL_SERVER_ERROR,
} from '@/config/constants/responses.constant';
import { UpdateMovieService } from '@/modules/movies/services/UpdateMovies.service';
import { ExceptionErrorDTO } from '@/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from '@/shared/errors/dtos/validationError.dto';
import { Body, Controller, Param, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UpdateMoviesDTO } from '../../../dtos/requests/UpdateMovies.dto';
import { Movie } from '../../typeorm/entities/Movie.entity';

@ApiTags(MOVIES)
@Controller(MOVIES.toLocaleLowerCase())
export class UpdateMovieController {
  constructor(private updateMovieService: UpdateMovieService) {}

  @Put(':id')
  @ApiOkResponse({ type: Movie, description: OK_RESPONSE })
  @ApiBadRequestResponse({
    type: ValidationErrorDTO,
    description: BAD_REQUEST_RESPONSE,
  })
  @ApiUnauthorizedResponse({
    type: ExceptionErrorDTO,
    description: UNAUTHORIZED_RESPONSE,
  })
  @ApiConflictResponse({
    type: ExceptionErrorDTO,
    description: CONFLICT_RESPONSE,
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: INTERNAL_SERVER_ERROR,
  })
  handle(
    @Param('id') id: string,
    @Body() { name, description, duration }: UpdateMoviesDTO,
  ) {
    return this.updateMovieService.execute({
      name,
      description,
      duration,
      movieId: id,
    });
  }
}
