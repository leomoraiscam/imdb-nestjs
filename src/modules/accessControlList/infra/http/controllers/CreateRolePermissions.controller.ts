import { CreatePermissionRolesDTO } from '@/modules/accessControlList/dtos/http/requests/CreatePermissionRoles.dto';
import { CreatedPermissionRolesDTO } from '@/modules/accessControlList/dtos/http/responses/CreatedPermissionRoles.dto';
import { RolesEnum } from '@/modules/accessControlList/dtos/roles.enum';
import { CreateRolePermissionService } from '@/modules/accessControlList/services/CreateRolePermission.service';
import { HasRoles } from '@/shared/decorators/roles.decorator';
import { ExceptionErrorDTO } from '@/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from '@/shared/errors/dtos/validationError.dto';
import { RolesGuard } from '@/shared/guards/Roles.guard';
import { JwtAuthGuard } from '@/shared/infra/http/guards/jwtAuth.guard';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

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
    type: CreatedPermissionRolesDTO,
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
  @HasRoles(RolesEnum.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  handle(
    @Param('id') id: string,
    @Body() { permissions }: CreatePermissionRolesDTO,
  ): Promise<Permission> {
    return this.createRolePermissionService.execute({
      roleId: id,
      permissions,
    });
  }
}
