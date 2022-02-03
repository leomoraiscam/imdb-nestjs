import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { classToClass } from 'class-transformer';
import { User } from 'src/modules/users/infra/typeorm/entities/User.entity';
import { ExceptionErrorDTO } from 'src/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from 'src/shared/errors/dtos/validationError.dto';

import { CreateAccessControlListToUserService } from '../../../services/CreateAccessControlListToUser.service';
interface ICreateACLToUser {
  permissions: string[];
  roles: string[];
}

@ApiTags('Access Control List')
@Controller('users/:user_id/acl')
export class UserAccessControlListController {
  constructor(
    private readonly createAccessControlListToUserService: CreateAccessControlListToUserService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: null,
    description: 'This will be returned when the created role',
  })
  @ApiBadRequestResponse({
    type: ValidationErrorDTO,
    description: 'This will be returned when has validation error',
  })
  @ApiNotFoundResponse({
    type: ExceptionErrorDTO,
    description:
      'This will be returned when the interest to be deleted does not exist',
  })
  async handler(
    @Param('id') user_id: string,
    @Body() { permissions, roles }: ICreateACLToUser,
  ): Promise<User> {
    const permission = this.createAccessControlListToUserService.execute({
      user_id,
      permissions,
      roles,
    });

    return classToClass(permission);
  }
}
