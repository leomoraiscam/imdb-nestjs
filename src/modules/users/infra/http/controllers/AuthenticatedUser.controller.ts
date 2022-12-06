import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
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

import { AuthenticateUserService } from '../../../services/AuthenticateUser.service';
import { User } from '../../typeorm/entities/User.entity';

interface IUser {
  email: string;
  password: string;
}

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
  public async handle(@Body() { email, password }: IUser) {
    const authenticateUser = await this.authenticateUserService.execute({
      email,
      password,
    });

    return classToClass(authenticateUser);
  }
}
