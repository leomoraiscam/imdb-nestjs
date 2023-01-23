import { USERS } from '@/config/constants/resourceTags.constants';
import {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_RESPONSE,
  OK_RESPONSE,
  UNAUTHORIZED_RESPONSE,
} from '@/config/constants/responses.constant';
import { ShowProfileUserService } from '@/modules/users/services/ShowProfileUser.service';
import { AuthenticatedUser } from '@/shared/decorators/authenticatedUser.decorator';
import { ExceptionErrorDTO } from '@/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from '@/shared/errors/dtos/validationError.dto';
import { JwtAuthGuard } from '@/shared/infra/http/guards/jwtAuth.guard';
import {
  Controller,
  Get,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { classToClass } from 'class-transformer';

import { User } from '../../typeorm/entities/User.entity';

@ApiTags(USERS)
@Controller('profile')
export class ShowProfileUserController {
  constructor(private readonly showProfileService: ShowProfileUserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: User,
    description: OK_RESPONSE,
  })
  @ApiUnauthorizedResponse({
    type: ValidationErrorDTO,
    description: UNAUTHORIZED_RESPONSE,
  })
  @ApiNotFoundResponse({
    type: ExceptionErrorDTO,
    description: NOT_FOUND_RESPONSE,
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: INTERNAL_SERVER_ERROR,
  })
  @UseGuards(JwtAuthGuard)
  public async handle(@AuthenticatedUser('id') id: string): Promise<User> {
    const user = await this.showProfileService.execute(id);

    return classToClass(user);
  }
}
