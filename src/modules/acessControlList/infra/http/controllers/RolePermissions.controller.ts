import { CreatePermissionRolesResponseDTO } from '@/modules/acessControlList/dtos/http/responses/CreatePermissionRolesResponse.dto';
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
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { ExceptionErrorDTO } from 'src/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from 'src/shared/errors/dtos/validationError.dto';

import { CreatePermissionRolesRequestDTO } from '../../../dtos/http/requests/CreatePermissionRolesRequest.dto';
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
    type: CreatePermissionRolesResponseDTO,
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
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: 'This will be returned when an unexpected error occurs',
  })
  handle(
    @Param('id') id: string,
    @Body() { permissions }: CreatePermissionRolesRequestDTO,
  ): Promise<Permission> {
    return this.createRolePermissionService.execute({
      role_id: id,
      permissions,
    });
  }
}
