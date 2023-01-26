import { DIRECTORS } from '@/config/constants/resourceTags.constants';
import {
  INTERNAL_SERVER_ERROR,
  NO_CONTENT_RESPONSE,
  OK_RESPONSE,
} from '@/config/constants/responses.constant';
import { ListCastsDTO } from '@/modules/casts/dtos/requests/ListCasts.dto';
import { ListDirectorsServices } from '@/modules/casts/services/ListDirectors.service';
import { ExceptionErrorDTO } from '@/shared/errors/dtos/exceptionError.dto';
import { CheckEmptyListInterceptor } from '@/shared/interceptors/checkEmptyList.interceptor';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Director } from '../../typeorm/entities/Director.entity';

@ApiTags(DIRECTORS)
@Controller(DIRECTORS.toLowerCase())
export class ListDirectorsController {
  constructor(private readonly listDirectorsServices: ListDirectorsServices) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Director, description: OK_RESPONSE })
  @ApiNoContentResponse({
    description: NO_CONTENT_RESPONSE,
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: INTERNAL_SERVER_ERROR,
  })
  @UseInterceptors(new CheckEmptyListInterceptor())
  async handle(@Query() { name, page, perPage }: ListCastsDTO) {
    return this.listDirectorsServices.execute({
      name,
      page,
      perPage,
    });
  }
}
