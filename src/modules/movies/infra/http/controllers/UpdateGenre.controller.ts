import { GENRES } from '@/config/constants/resourceTags.constants';
import {
  OK_RESPONSE,
  UNAUTHORIZED_RESPONSE,
  BAD_REQUEST_RESPONSE,
  CONFLICT_RESPONSE,
  INTERNAL_SERVER_ERROR,
} from '@/config/constants/responses.constant';
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

import { UpdateGenreDTO } from '../../../dtos/requests/UpdateGenres.dto';
import { UpdateGenreService } from '../../../services/UpdateGenre.service';
import { Genre } from '../../typeorm/entities/Genre.entity';

@ApiTags(GENRES)
@Controller(GENRES.toLocaleLowerCase())
export class UpdateGenreController {
  constructor(private readonly updateGenreService: UpdateGenreService) {}

  @Put(':id')
  @ApiOkResponse({ type: Genre, description: OK_RESPONSE })
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
    @Body() { name, description }: UpdateGenreDTO,
  ) {
    return this.updateGenreService.execute({
      name,
      description,
      genreId: id,
    });
  }
}
