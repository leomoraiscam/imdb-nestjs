import { GENRES } from '@/config/constants/resourceTags.constants';
import {
  CREATED_RESPONSE,
  BAD_REQUEST_RESPONSE,
  UNAUTHORIZED_RESPONSE,
  CONFLICT_RESPONSE,
  INTERNAL_SERVER_ERROR,
} from '@/config/constants/responses.constant';
import { PermissionsEnum } from '@/modules/accessControlList/dtos/permissions.enum';
import { CreateGenresDTO } from '@/modules/movies/dtos/requests/CreateGenres.dto';
import { CreateGenreService } from '@/modules/movies/services/CreateGenre.service';
import { HasPermissions } from '@/shared/decorators/permissions.decorator';
import { ExceptionErrorDTO } from '@/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from '@/shared/errors/dtos/validationError.dto';
import { PermissionsGuard } from '@/shared/guards/Permissions.guard';
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
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

import { Genre } from '../../typeorm/entities/Genre.entity';

@ApiTags(GENRES)
@Controller(GENRES.toLowerCase())
export class CreateGenreController {
  constructor(private readonly createGenreService: CreateGenreService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: Genre,
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
  @HasPermissions(
    PermissionsEnum.CREATE,
    PermissionsEnum.UPDATE,
    PermissionsEnum.DELETE,
  )
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
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
