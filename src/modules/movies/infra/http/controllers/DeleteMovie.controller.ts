import { MOVIES } from '@/config/constants/resourceTags.constants';
import {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_RESPONSE,
  UNAUTHORIZED_RESPONSE,
} from '@/config/constants/responses.constant';
import { ExceptionErrorDTO } from '@/shared/errors/dtos/exceptionError.dto';
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { DeleteMovieService } from '../../../services/DeleteMovies.service';

@ApiTags(MOVIES)
@Controller(MOVIES.toLowerCase())
export class DeleteMovieController {
  constructor(private readonly deleteMovieService: DeleteMovieService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiUnauthorizedResponse({
    type: ExceptionErrorDTO,
    description: UNAUTHORIZED_RESPONSE,
  })
  @ApiNotFoundResponse({
    type: ExceptionErrorDTO,
    description: NOT_FOUND_RESPONSE,
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: INTERNAL_SERVER_ERROR,
  })
  handle(@Param('id') id: string) {
    return this.deleteMovieService.execute(id);
  }
}
