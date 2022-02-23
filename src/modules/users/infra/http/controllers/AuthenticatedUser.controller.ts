import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiUnprocessableEntityResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { classToClass } from 'class-transformer';
import { ExceptionErrorDTO } from 'src/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from 'src/shared/errors/dtos/validationError.dto';
import { LocalAuthGuard } from 'src/shared/infra/http/guards/localAuth.guard';

import { AuthenticateUserService } from '../../../services/AuthenticateUser.service';
import { User } from '../../typeorm/entities/User.entity';

@ApiTags('Sessions')
@Controller('sessions')
export class AuthenticatedUserController {
  constructor(
    private readonly authenticateUserService: AuthenticateUserService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: User,
    description: 'This will be returned when the created session',
  })
  @ApiUnprocessableEntityResponse({
    type: ExceptionErrorDTO,
    description:
      'This will be returned when some fields did not came the way we needed',
  })
  @ApiBadRequestResponse({
    type: ValidationErrorDTO,
    description: 'This will be returned when has validation error',
  })
  @ApiNotFoundResponse({
    type: ExceptionErrorDTO,
    description:
      'This will be returned when the user to be deleted does not exist',
  })
  @UseGuards(LocalAuthGuard)
  public async handle(@Request() req: any) {
    const user = req.user as User;

    const authenticateUser = await this.authenticateUserService.execute(user);

    return classToClass(authenticateUser);
  }
}
