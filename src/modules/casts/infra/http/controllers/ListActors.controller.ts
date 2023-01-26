import { ACTORS } from '@/config/constants/resourceTags.constants';
import {
  INTERNAL_SERVER_ERROR,
  NO_CONTENT_RESPONSE,
  OK_RESPONSE,
} from '@/config/constants/responses.constant';
import { ListCastsDTO } from '@/modules/casts/dtos/requests/ListCasts.dto';
import { ListActorsServices } from '@/modules/casts/services/ListActors.service';
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

import { Actor } from '../../typeorm/entities/Actor.entity';

@ApiTags(ACTORS)
@Controller(ACTORS.toLowerCase())
export class ListActorsController {
  constructor(private readonly listActorsServices: ListActorsServices) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Actor, description: OK_RESPONSE })
  @ApiNoContentResponse({
    description: NO_CONTENT_RESPONSE,
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: INTERNAL_SERVER_ERROR,
  })
  @UseInterceptors(new CheckEmptyListInterceptor())
  async handle(@Query() { name, page, perPage }: ListCastsDTO) {
    return this.listActorsServices.execute({
      name,
      page,
      perPage,
    });
  }
}
