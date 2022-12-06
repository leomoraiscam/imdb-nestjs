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
import { UpdateUserDTO } from 'src/modules/users/dtos/UpdateUser.dto';
import { UpdateUserService } from 'src/modules/users/services/UpdateUser.service';
import { ExceptionErrorDTO } from 'src/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from 'src/shared/errors/dtos/validationError.dto';
import { JwtAuthGuard } from 'src/shared/infra/http/guards/jwtAuth.guard';

import { User } from '../../typeorm/entities/User.entity';

@ApiTags('Users')
@Controller('profile')
export class UpdateProfileUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: User })
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
      'This will be returned when the user to be deleted does not exist',
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
    const userId = req.user.id;
    const { email, name, password, oldPassword } = updateUserDTO;

    const user = await this.updateUserService.execute({
      userId,
      oldPassword,
      password,
      name,
      email,
    });

    return classToClass(user);
  }
}
