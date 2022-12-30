import { CreateGenresDTO } from '@/modules/movies/dtos/requests/CreateGenres.dto';
import { CreateGenreService } from '@/modules/movies/services/CreateGenre.service';
import { HasRoles } from '@/shared/decorators/roles.decorator';
import { ExceptionErrorDTO } from '@/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from '@/shared/errors/dtos/validationError.dto';
import { RolesGuard } from '@/shared/guards/Roles.guard';
import { JwtAuthGuard } from '@/shared/infra/http/guards/jwtAuth.guard';
import { RoleEnum } from '@/shared/utils/role.enum';
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
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

import { Genre } from '../../typeorm/entities/Genre.entity';

@ApiTags('Genres')
@Controller('genres')
export class CreateGenresController {
  constructor(private readonly createGenreService: CreateGenreService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: Genre,
    description: 'This will be returned when the created genre',
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
  @HasRoles(RoleEnum.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  handle(
    @Body()
    { name, description }: CreateGenresDTO,
  ): Promise<Genre> {
    return this.createGenreService.execute({
      name,
      description,
    });
  }
}
