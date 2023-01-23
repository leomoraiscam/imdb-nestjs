import { SESSIONS } from '@/config/constants/resourceTags.constants';
import {
  BAD_REQUEST_RESPONSE,
  CREATED_RESPONSE,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED_RESPONSE,
} from '@/config/constants/responses.constant';
import { AuthenticateUserDTO } from '@/modules/users/dtos/requests/AuthenticateUser.dto';
import { AuthenticatedUserDTO } from '@/modules/users/dtos/responses/AuthenticatedUser.dto';
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

@ApiTags(SESSIONS)
@Controller(SESSIONS.toLowerCase())
export class AuthenticatedUserController {
  constructor(
    private readonly authenticateUserService: AuthenticateUserService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: AuthenticatedUserDTO,
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
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: INTERNAL_SERVER_ERROR,
  })
  public async handle(@Body() { email, password }: AuthenticateUserDTO) {
    const authenticateUser = await this.authenticateUserService.execute({
      email,
      password,
    });

    return classToClass(authenticateUser);
  }
}
