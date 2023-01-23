import { DIRECTORS } from '@/config/constants/resourceTags.constants';
import {
  BAD_REQUEST_RESPONSE,
  CONFLICT_RESPONSE,
  INTERNAL_SERVER_ERROR,
  OK_RESPONSE,
  UNAUTHORIZED_RESPONSE,
} from '@/config/constants/responses.constant';
import { UpdateDirectorDTO } from '@/modules/casts/dtos/requests/UpdateDirector.dto';
import { UpdateDirectorService } from '@/modules/casts/services/UpdateDirector.service';
import { ExceptionErrorDTO } from '@/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from '@/shared/errors/dtos/validationError.dto';
import { JwtAuthGuard } from '@/shared/infra/http/guards/jwtAuth.guard';
import { Controller, Put, Body, UseGuards, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

import { Director } from '../../typeorm/entities/Direction.entity';

@ApiTags(DIRECTORS)
@Controller(DIRECTORS.toLowerCase())
export class UpdateDirectorController {
  constructor(private readonly updateDirectorService: UpdateDirectorService) {}

  @Put(':id')
  @ApiOkResponse({ type: Director, description: OK_RESPONSE })
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
  @UseGuards(JwtAuthGuard)
  handle(
    @Body() updateDirectorDTO: UpdateDirectorDTO,
    @Param('id') id: string,
  ) {
    const { gender, name } = updateDirectorDTO;

    return this.updateDirectorService.execute({
      directorId: id,
      gender,
      name,
    });
  }
}
