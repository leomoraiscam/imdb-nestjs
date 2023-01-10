import { OptionsList } from '@/modules/casts/dtos/requests/OptionsToListData.dto';
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

@ApiTags('Actors')
@Controller('actors')
export class ListActorsController {
  constructor(private readonly listActorsServices: ListActorsServices) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Actor })
  @ApiNoContentResponse({
    description: 'This will be returned when the receive empty list',
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: 'This will be returned when an unexpected error occurs',
  })
  @UseInterceptors(new CheckEmptyListInterceptor())
  async handle(@Query() { name, take, skip, page }: OptionsList) {
    return this.listActorsServices.execute({
      name,
      take,
      skip,
      page,
    });
  }
}
