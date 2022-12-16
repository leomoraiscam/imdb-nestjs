import { AuthenticateUserRequestDTO } from '@/modules/users/dtos/AuthenticateUserRequest.dto';
import { AuthenticateUserResponseDTO } from '@/modules/users/dtos/AuthenticateUserResponse.dto';
import { AuthenticateUserService } from '@/modules/users/services/AuthenticateUser.service';
import { ExceptionErrorDTO } from '@/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from '@/shared/errors/dtos/validationError.dto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { classToClass } from 'class-transformer';

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
  @ApiBadRequestResponse({
    type: ValidationErrorDTO,
    description: 'This will be returned when has validation error',
  })
  @ApiUnauthorizedResponse({
    type: ValidationErrorDTO,
    description: 'This will be return when email or password wrong',
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
