import { UpdateUserDTO } from '@/modules/users/dtos/UpdateUser.dto';
import { UpdateUserService } from '@/modules/users/services/UpdateUser.service';
import { ExceptionErrorDTO } from '@/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from '@/shared/errors/dtos/validationError.dto';
import { JwtAuthGuard } from '@/shared/infra/http/guards/jwtAuth.guard';
import {
  Controller,
  Request,
  HttpCode,
  HttpStatus,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { classToClass } from 'class-transformer';

import { User } from '../../typeorm/entities/User.entity';

@ApiTags('Users')
@Controller('profile')
export class UpdateProfileUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: User,
    description: 'This will be returned when user updated',
  })
  @ApiBadRequestResponse({
    type: ValidationErrorDTO,
    description: 'This will be returned when has validation error',
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
  @ApiConflictResponse({
    type: ExceptionErrorDTO,
    description: 'This will be returned when the email is already in use',
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: 'This will be returned when an unexpected error occurs',
  })
  @UseGuards(JwtAuthGuard)
  public async update(
    @Request() req: any,
    @Body() updateUserDTO: UpdateUserDTO,
  ): Promise<User> {
    const user_id = req.user.id;
    const { email, name, password, old_password } = updateUserDTO;

    const user = await this.updateUserService.execute({
      user_id,
      old_password,
      password,
      name,
      email,
    });

    return classToClass(user);
  }
}
