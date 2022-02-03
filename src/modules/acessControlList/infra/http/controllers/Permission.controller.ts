import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { classToClass } from 'class-transformer';
import { ExceptionErrorDTO } from 'src/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from 'src/shared/errors/dtos/validationError.dto';

import { ICreatePermissionsDTO } from '../../../dtos/ICreatePermissions.dto';
import { CreatePermissionService } from '../../../services/CreatePermission.service';
import { Permission } from '../../typeorm/entities/Permission.entity';

@ApiTags('Access Control List')
@Controller('permissions')
export class PermissionController {
  constructor(
    private readonly createPermissionService: CreatePermissionService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: Permission,
    description: 'This will be returned when the created role',
  })
  @ApiBadRequestResponse({
    type: ValidationErrorDTO,
    description: 'This will be returned when has validation error',
  })
  @ApiConflictResponse({
    type: ExceptionErrorDTO,
    description: 'This will be returned when the email is already in use',
  })
  async create(
    @Body() { name, description }: ICreatePermissionsDTO,
  ): Promise<Permission> {
    const permission = this.createPermissionService.execute({
      name,
      description,
    });

    return classToClass(permission);
  }
}
