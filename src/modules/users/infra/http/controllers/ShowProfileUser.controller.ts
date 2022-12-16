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

@ApiTags('Users')
@Controller('profile')
export class ShowProfileUserController {
  constructor(private readonly showProfileService: ShowProfileUserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: User,
    description:
      'This will be returned when the user was found and the same return data',
  })
  @ApiUnauthorizedResponse({
    type: ValidationErrorDTO,
    description:
      'This will be return when client doesnt provide Authorization Cookie',
  })
  @ApiNotFoundResponse({
    type: ExceptionErrorDTO,
    description:
      'This will be returned when the user to be deleted or does not exist',
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: 'This will be returned when an unexpected error occurs',
  })
  @UseGuards(JwtAuthGuard)
  public async handle(@AuthenticatedUser('id') id: string): Promise<User> {
    const user = await this.showProfileService.execute(id);

    return classToClass(user);
  }
}
