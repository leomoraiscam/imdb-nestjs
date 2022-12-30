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
} from '@nestjs/swagger';
import { classToClass } from 'class-transformer';
import { AuthenticatedUser } from 'src/shared/decorators/authenticatedUser.decorator';
import { HasRoles } from 'src/shared/decorators/roles.decorator';
import { ExceptionErrorDTO } from 'src/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from 'src/shared/errors/dtos/validationError.dto';
import { RolesGuard } from 'src/shared/guards/Roles.guard';
import { JwtAuthGuard } from 'src/shared/infra/http/guards/jwtAuth.guard';

import { CreateVotesDTO } from '../../../dtos/requests/CreateVotes.dto';
import { CreateVotesToMoviesService } from '../../../services/CreateVotesToMovies.service';
import { Vote } from '../../typeorm/entities/Vote.entity';

@ApiTags('Vote')
@Controller('movies/:movieId/votes')
export class CreateVoteController {
  constructor(
    private readonly createVotesToMoviesService: CreateVotesToMoviesService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: null,
    description: 'This will be returned when the created vote',
  })
  @ApiBadRequestResponse({
    type: ValidationErrorDTO,
    description: 'This will be returned when has validation error',
  })
  @ApiNotFoundResponse({
    type: ExceptionErrorDTO,
    description:
      'This will be returned when the movie to be deleted does not exist',
  })
  @HasRoles(RolesEnum.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async handle(
    @AuthenticatedUser('id') id: string,
    @Param('movieId') movieId: string,
    @Body() { note }: CreateVotesDTO,
  ): Promise<Vote> {
    const vote = await this.createVotesToMoviesService.execute({
      movieId,
      note,
      userId: id,
    });

    return classToClass(vote);
  }
}
