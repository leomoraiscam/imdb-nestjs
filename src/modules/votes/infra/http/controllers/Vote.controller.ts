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
import { ExceptionErrorDTO } from 'src/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from 'src/shared/errors/dtos/validationError.dto';
import { JwtAuthGuard } from 'src/shared/infra/http/guards/jwtAuth.guard';

import { ICreateVoteRequestDTO } from '../../../dtos/ICreateVoteRequest';
import { CreateVotesToMoviesService } from '../../../services/CreateVotesToMovies.service';
import { Vote } from '../../typeorm/entities/Vote.entity';

@ApiTags('Vote')
@Controller('movies/:movie_id/vote')
export class VoteController {
  constructor(
    private readonly createVotesToMoviesService: CreateVotesToMoviesService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: null,
    description: 'This will be returned when the created role',
  })
  @ApiBadRequestResponse({
    type: ValidationErrorDTO,
    description: 'This will be returned when has validation error',
  })
  @ApiNotFoundResponse({
    type: ExceptionErrorDTO,
    description:
      'This will be returned when the interest to be deleted does not exist',
  })
  @UseGuards(JwtAuthGuard)
  async handler(
    @AuthenticatedUser('id') id: string,
    @Param('movie_id') movie_id: string,
    @Body() { note }: ICreateVoteRequestDTO,
  ): Promise<Vote> {
    const vote = await this.createVotesToMoviesService.execute({
      movie_id,
      note,
      user_id: id,
    });

    return classToClass(vote);
  }
}
