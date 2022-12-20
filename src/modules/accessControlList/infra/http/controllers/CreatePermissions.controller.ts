import { CreatePermissionsDTO } from '@/modules/accessControlList/dtos/http/requests/CreatePermissions.dto';
import { CreatePermissionService } from '@/modules/accessControlList/services/CreatePermission.service';
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
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: 'This will be returned when an unexpected error occurs',
  })
  handle(
    @Body() { name, description }: CreatePermissionsDTO,
  ): Promise<Permission> {
    return this.createPermissionService.execute({
      name,
      description,
    });
  }
}
