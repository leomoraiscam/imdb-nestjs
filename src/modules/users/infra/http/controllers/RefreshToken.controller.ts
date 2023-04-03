import { SESSIONS } from '@/config/constants/resourceTags.constants';
import {
  CREATED_RESPONSE,
  INTERNAL_SERVER_ERROR,
} from '@/config/constants/responses.constant';
import { RefreshTokenDTO } from '@/modules/users/dtos/responses/RefreshToken.dto';
import { RefreshTokenService } from '@/modules/users/services/RefreshToken.service';
import { ExceptionErrorDTO } from '@/shared/errors/dtos/exceptionError.dto';
import { Controller, Post, Headers } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags(SESSIONS)
@Controller('refresh-token')
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Post()
  @ApiCreatedResponse({
    type: RefreshTokenDTO,
    description: CREATED_RESPONSE,
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: INTERNAL_SERVER_ERROR,
  })
  public async handle(@Headers('x-access-token') token: string) {
    const refreshToken = await this.refreshTokenService.execute(token);

    return refreshToken;
  }
}
