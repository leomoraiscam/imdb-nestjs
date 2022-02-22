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

import { ICreatePermissionRoles } from '../../../dtos/ICreatePermissionRoles.dto';
import { CreateRolePermissionService } from '../../../services/CreateRolePermission.service';
import { Permission } from '../../typeorm/entities/Permission.entity';

@ApiTags('Access Control List')
@Controller('roles/:id/permissions')
export class CreateRolePermissionController {
  constructor(
    private readonly createRolePermissionService: CreateRolePermissionService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: null,
    description: 'This will be returned when the created permission role',
  })
  @ApiBadRequestResponse({
    type: ValidationErrorDTO,
    description: 'This will be returned when has validation error',
  })
  @ApiNotFoundResponse({
    type: ExceptionErrorDTO,
    description:
      'This will be returned when the role or permission to be deleted does not exist',
  })
  async handle(
    @Param('id') id: string,
    @Body() { permissions }: ICreatePermissionRoles,
  ): Promise<Permission> {
    const permissionRoles = await this.createRolePermissionService.execute({
      role_id: id,
      permissions,
    });

    return classToClass(permissionRoles);
  }
}
