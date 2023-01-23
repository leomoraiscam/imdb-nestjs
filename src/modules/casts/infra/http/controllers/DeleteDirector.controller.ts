import { DIRECTORS } from '@/config/constants/resourceTags.constants';
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

import { DeleteDirectorService } from '../../../services/DeleteDirector.service';

@ApiTags(DIRECTORS)
@Controller(DIRECTORS.toLowerCase())
export class DeleteDirectorController {
  constructor(private readonly deleteDirectorService: DeleteDirectorService) {}

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
    return this.deleteDirectorService.execute(id);
  }
}
