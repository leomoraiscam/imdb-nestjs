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
import { HasRoles } from 'src/shared/decorators/roles.decorator';
import { ExceptionErrorDTO } from 'src/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from 'src/shared/errors/dtos/validationError.dto';
import { RolesGuard } from 'src/shared/guards/Roles.guard';
import { JwtAuthGuard } from 'src/shared/infra/http/guards/jwtAuth.guard';

import { RoleEnum } from '../../../../../shared/utils/role.enum';
import { CreateMovieRequestDTO } from '../../../dtos/CreateMovieRequest.dto';
import { CreateMovieService } from '../../../services/CreateMovie.service';
import { Movie } from '../../typeorm/entities/Movie.entity';

@ApiTags('Movies')
@Controller('movies')
export class CreateMoviesController {
  constructor(private createMovieService: CreateMovieService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: Movie,
    description: 'This will be returned when the created movie',
  })
  @ApiBadRequestResponse({
    type: ValidationErrorDTO,
    description: 'This will be returned when has validation error',
  })
  @ApiUnauthorizedResponse({
    type: ValidationErrorDTO,
    description:
      'This will be return when client doesnt provide Authorization Cookie',
  })
  @ApiConflictResponse({
    type: ExceptionErrorDTO,
    description: 'This will be returned when the name is already in use',
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: 'This will be returned when an unexpected error occurs',
  })
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async handle(
    @Body()
    {
      author,
      description,
      duration,
      genre_ids,
      name,
      year,
    }: CreateMovieRequestDTO,
  ): Promise<Movie> {
    return this.createMovieService.execute({
      author,
      description,
      duration,
      genre_ids,
      name,
      year,
    });
  }
}
