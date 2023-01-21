import { VOTES } from '@/config/constants/resourceTags.constants';
import {
  CREATED_RESPONSE,
  BAD_REQUEST_RESPONSE,
  NOT_FOUND_RESPONSE,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED_RESPONSE,
} from '@/config/constants/responses.constant';
import { RolesEnum } from '@/modules/accessControlList/dtos/roles.enum';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthenticatedUser } from 'src/shared/decorators/authenticatedUser.decorator';
import { HasRoles } from 'src/shared/decorators/roles.decorator';
import { ExceptionErrorDTO } from 'src/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from 'src/shared/errors/dtos/validationError.dto';
import { RolesGuard } from 'src/shared/guards/Roles.guard';
import { JwtAuthGuard } from 'src/shared/infra/http/guards/jwtAuth.guard';

import { CreateVotesDTO } from '../../../dtos/requests/CreateVotes.dto';
import { CreateVotesToMoviesService } from '../../../services/CreateVotesToMovies.service';
import { Vote } from '../../typeorm/entities/Vote.entity';

@ApiTags(VOTES)
@Controller('movies/:movieId/votes')
export class CreateVoteController {
  constructor(
    private readonly createVotesToMoviesService: CreateVotesToMoviesService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: Vote,
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
  @ApiNotFoundResponse({
    type: ExceptionErrorDTO,
    description: NOT_FOUND_RESPONSE,
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: INTERNAL_SERVER_ERROR,
  })
  @HasRoles(RolesEnum.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  handle(
    @AuthenticatedUser('id') id: string,
    @Param('movieId') movieId: string,
    @Body() { note }: CreateVotesDTO,
  ): Promise<Vote> {
    return this.createVotesToMoviesService.execute({
      movieId,
      note,
      userId: id,
    });
  }
}
