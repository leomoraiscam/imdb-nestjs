import { GENRES } from '@/config/constants/resourceTags.constants';
import {
  OK_RESPONSE,
  NO_CONTENT_RESPONSE,
  INTERNAL_SERVER_ERROR,
} from '@/config/constants/responses.constant';
import { OptionsList } from '@/modules/movies/dtos/requests/OptionsToListMovie.dto';
import { ListGenresService } from '@/modules/movies/services/ListGenres.service';
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

import { Genre } from '../../typeorm/entities/Genre.entity';

@ApiTags(GENRES)
@Controller(GENRES.toLowerCase())
export class ListGenresController {
  constructor(private readonly listGenresService: ListGenresService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Genre, description: OK_RESPONSE })
  @ApiNoContentResponse({
    description: NO_CONTENT_RESPONSE,
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: INTERNAL_SERVER_ERROR,
  })
  @UseInterceptors(new CheckEmptyListInterceptor())
  handle(@Query() { take, skip, page }: OptionsList) {
    return this.listGenresService.execute({
      take,
      skip,
      page,
    });
  }
}
