import { SESSIONS } from '@/config/constants/resourceTags.constants';
import {
  BAD_REQUEST_RESPONSE,
  INTERNAL_SERVER_ERROR,
  NO_CONTENT_RESPONSE,
  UNAUTHORIZED_RESPONSE,
} from '@/config/constants/responses.constant';
import { ResetPasswordUserDTO } from '@/modules/users/dtos/requests/ResetPasswordUser.dto';
import { ResetPasswordUserService } from '@/modules/users/services/resetPasswordUser.service';
import { ExceptionErrorDTO } from '@/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from '@/shared/errors/dtos/validationError.dto';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags(SESSIONS)
@Controller('reset-password')
export class ResetPasswordUserController {
  constructor(
    private readonly resetPasswordUserService: ResetPasswordUserService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: NO_CONTENT_RESPONSE,
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
  public async handle(
    @Query('refreshToken') refreshToken: string,
    @Body() { password }: ResetPasswordUserDTO,
  ) {
    await this.resetPasswordUserService.execute({
      token: refreshToken,
      password,
    });
  }
}
