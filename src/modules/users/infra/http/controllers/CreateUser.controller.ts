import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { classToClass } from 'class-transformer';
import { ExceptionErrorDTO } from 'src/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from 'src/shared/errors/dtos/validationError.dto';

import { CreateUserDTO } from '../../../dtos/CreateUser.dto';
import { CreateUserService } from '../../../services/CreateUser.service';
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
  async handle(
    @Body() { password, name, email }: CreateUserDTO,
  ): Promise<User> {
    const user = await this.createUserService.execute({
      password,
      name,
      email,
    });

    return classToClass(user);
  }
}
