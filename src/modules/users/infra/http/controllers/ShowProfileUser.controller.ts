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
import { ExceptionErrorDTO } from 'src/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from 'src/shared/errors/dtos/validationError.dto';

import { AuthenticatedUser } from '../../../../../shared/decorators/authenticatedUser.decorator';
import { JwtAuthGuard } from '../../../../../shared/infra/http/guards/jwtAuth.guard';
import { ShowProfileUserService } from '../../../services/ShowProfileUser.service';
import { User } from '../../typeorm/entities/User.entity';

@ApiTags('Users')
@Controller('profile')
export class ShowProfileUserController {
  constructor(private readonly showProfileService: ShowProfileUserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse({
    type: ExceptionErrorDTO,
    description:
      'This will be returned when the user to be deleted does not exist',
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
  @UseGuards(JwtAuthGuard)
  public async handle(@AuthenticatedUser('id') id: string): Promise<User> {
    const user = await this.showProfileService.execute({ user_id: id });

    return classToClass(user);
  }
}
