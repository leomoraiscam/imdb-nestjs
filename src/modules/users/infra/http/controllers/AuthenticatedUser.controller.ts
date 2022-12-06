import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { classToClass } from 'class-transformer';
import { AuthenticateUserResponseDTO } from 'src/modules/users/dtos/AuthenticateUserResponse.dto';
import { ExceptionErrorDTO } from 'src/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from 'src/shared/errors/dtos/validationError.dto';

import { AuthenticateUserService } from '../../../services/AuthenticateUser.service';
import { AuthenticateUserRequestDTO } from './../../../dtos/AuthenticateUserRequest.dto';

@ApiTags('Sessions')
@Controller('sessions')
export class AuthenticatedUserController {
  constructor(
    private readonly authenticateUserService: AuthenticateUserService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: AuthenticateUserResponseDTO,
    description: 'This will be returned when the created session',
  })
  @ApiUnauthorizedResponse({
    type: ValidationErrorDTO,
    description:
      'This will be return when client doesnt provide Authorization Cookie',
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: 'This will be returned when an unexpected error occurs',
  })
  public async handle(@Body() { email, password }: AuthenticateUserRequestDTO) {
    const authenticateUser = await this.authenticateUserService.execute({
      email,
      password,
    });

    return classToClass(authenticateUser);
  }
}
