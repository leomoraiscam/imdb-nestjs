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
import { ExceptionErrorDTO } from 'src/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from 'src/shared/errors/dtos/validationError.dto';

import { CreateRolePermissionService } from '../../../services/CreateRolePermission.service';
import { Permission } from '../../typeorm/entities/Permission.entity';
interface ICreatePermissionRoles {
  role_id?: string;
  permissions?: string[];
}

@ApiTags('Access Control List')
@Controller('roles/:id/permissions')
export class RolePermissionController {
  constructor(
    private readonly createRolePermissionService: CreateRolePermissionService,
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
    @Param('id') id: string,
    @Body() { permissions }: ICreatePermissionRoles,
  ): Promise<Permission> {
    const permission = this.createRolePermissionService.execute({
      role_id: id,
      permissions,
    });

    return classToClass(permission);
  }
}
