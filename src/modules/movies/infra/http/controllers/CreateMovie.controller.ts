import { MOVIES } from '@/config/constants/resourceTags.constants';
import {
  CREATED_RESPONSE,
  BAD_REQUEST_RESPONSE,
  UNAUTHORIZED_RESPONSE,
  CONFLICT_RESPONSE,
  INTERNAL_SERVER_ERROR,
} from '@/config/constants/responses.constant';
import { RolesEnum } from '@/modules/accessControlList/dtos/roles.enum';
import { CreateMoviesDTO } from '@/modules/movies/dtos/requests/CreateMovies.dto';
import { CreateMovieService } from '@/modules/movies/services/CreateMovie.service';
import { HasRoles } from '@/shared/decorators/roles.decorator';
import { ExceptionErrorDTO } from '@/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from '@/shared/errors/dtos/validationError.dto';
import { RolesGuard } from '@/shared/guards/Roles.guard';
import { JwtAuthGuard } from '@/shared/infra/http/guards/jwtAuth.guard';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Movie } from '../../typeorm/entities/Movie.entity';

@ApiTags(MOVIES)
@Controller(MOVIES.toLowerCase())
export class CreateMovieController {
  constructor(private readonly createMovieService: CreateMovieService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: Movie,
    description: CREATED_RESPONSE,
  })
  @ApiBadRequestResponse({
    type: ValidationErrorDTO,
    description: BAD_REQUEST_RESPONSE,
  })
  @ApiUnauthorizedResponse({
    type: ValidationErrorDTO,
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
  @HasRoles(RolesEnum.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async handle(
    @Body()
    {
      author,
      description,
      duration,
      genreIds,
      name,
      year,
      actorIds,
      directorId,
    }: CreateMoviesDTO,
  ): Promise<Movie> {
    return this.createMovieService.execute({
      author,
      description,
      duration,
      genreIds,
      name,
      year,
      actorIds,
      directorId,
    });
  }
}
