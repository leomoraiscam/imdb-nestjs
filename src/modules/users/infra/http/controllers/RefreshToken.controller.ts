import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';

import { RefreshTokenService } from '../../../services/RefreshToken.service';

@Controller('refresh-token')
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async handle(@Request() req: any) {
    const token = req.headers['x-access-token'];

    const refreshToken = await this.refreshTokenService.execute(token);

    return refreshToken;
  }
}
