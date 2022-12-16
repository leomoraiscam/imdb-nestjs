import { CreateUserDTO } from '@/modules/users/dtos/CreateUser.dto';
import { CreateUserService } from '@/modules/users/services/CreateUser.service';
import { ExceptionErrorDTO } from '@/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from '@/shared/errors/dtos/validationError.dto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { classToClass } from 'class-transformer';

import { User } from '../../typeorm/entities/User.entity';

@ApiTags('Users')
@Controller('users')
export class CreateUsersController {
  constructor(private createUserService: CreateUserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: User,
    description: 'This will be returned when the created user',
  })
  @ApiBadRequestResponse({
    type: ValidationErrorDTO,
    description: 'This will be returned when has validation error',
  })
  @ApiConflictResponse({
    type: ExceptionErrorDTO,
    description: 'This will be returned when the email is already in use',
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: 'This will be returned when an unexpected error occurs',
  })
  async handle(@Body() { password, name, email }: CreateUserDTO) {
    const user = await this.createUserService.execute({
      password,
      name,
      email,
    });

    return classToClass(user);
  }
}
