import { SESSIONS } from '@/config/constants/resourceTags.constants';
import {
  BAD_REQUEST_RESPONSE,
  INTERNAL_SERVER_ERROR,
  NO_CONTENT_RESPONSE,
  UNAUTHORIZED_RESPONSE,
} from '@/config/constants/responses.constant';
import { SendForgotPasswordDTO } from '@/modules/users/dtos/requests/SendForgotPassword.dto';
import { SendForgotPasswordMailService } from '@/modules/users/services/SendForgotPasswordMail.service';
import { ExceptionErrorDTO } from '@/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from '@/shared/errors/dtos/validationError.dto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags(SESSIONS)
@Controller('forgot-password')
export class SendForgotPasswordMailController {
  constructor(
    private readonly sendForgotPasswordMailService: SendForgotPasswordMailService,
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
  public async handle(@Body() { email }: SendForgotPasswordDTO) {
    await this.sendForgotPasswordMailService.execute(email);
  }
}
