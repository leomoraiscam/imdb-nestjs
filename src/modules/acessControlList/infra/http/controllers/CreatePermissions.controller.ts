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

import { CreatePermissionsDTO } from '../../../dtos/CreatePermissions.dto';
import { CreatePermissionService } from '../../../services/CreatePermission.service';
import { Permission } from '../../typeorm/entities/Permission.entity';

@ApiTags('Access Control List')
@Controller('permissions')
export class CreatePermissionController {
  constructor(
    private readonly createPermissionService: CreatePermissionService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: Permission,
    description: 'This will be returned when the created permission',
  })
  @ApiBadRequestResponse({
    type: ValidationErrorDTO,
    description: 'This will be returned when has validation error',
  })
  @ApiConflictResponse({
    type: ExceptionErrorDTO,
    description:
      'This will be returned when the name of permission is already in use',
  })
  async handle(
    @Body() { name, description }: CreatePermissionsDTO,
  ): Promise<Permission> {
    const permissions = this.createPermissionService.execute({
      name,
      description,
    });

    return classToClass(permissions);
  }
}
