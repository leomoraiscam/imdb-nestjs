import { ACCESS_CONTROL_LIST } from '@/config/constants/resourceTags.constants';
import {
  BAD_REQUEST_RESPONSE,
  CREATED_RESPONSE,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_RESPONSE,
} from '@/config/constants/responses.constant';
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

@ApiTags(ACCESS_CONTROL_LIST)
@Controller('roles/:id/permissions')
export class CreatePermissionsRoleController {
  constructor(
    private readonly createRolePermissionService: CreateRolePermissionService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: CreatedPermissionRolesDTO,
    description: CREATED_RESPONSE,
  })
  @ApiBadRequestResponse({
    type: ValidationErrorDTO,
    description: BAD_REQUEST_RESPONSE,
  })
  @ApiNotFoundResponse({
    type: ExceptionErrorDTO,
    description: NOT_FOUND_RESPONSE,
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: INTERNAL_SERVER_ERROR,
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
