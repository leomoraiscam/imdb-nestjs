import { OptionsList } from '@/modules/casts/dtos/requests/OptionsToListData.dto';
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

import { Director } from '../../typeorm/entities/Direction.entity';

@ApiTags('Directors')
@Controller('directors')
export class ListDirectorsController {
  constructor(private readonly listDirectorsServices: ListDirectorsServices) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Director })
  @ApiNoContentResponse({
    description: 'This will be returned when the receive empty list',
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: 'This will be returned when an unexpected error occurs',
  })
  @UseInterceptors(new CheckEmptyListInterceptor())
  async handle(@Query() { name, take, skip, page }: OptionsList) {
    return this.listDirectorsServices.execute({
      name,
      take,
      skip,
      page,
    });
  }
}
