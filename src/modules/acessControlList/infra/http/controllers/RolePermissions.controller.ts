import { Body, Controller, Param, Post } from '@nestjs/common';
import { classToClass } from 'class-transformer';

import { CreateRolePermissionService } from '../../../services/CreateRolePermission.service';
import { Permission } from '../../typeorm/entities/Permission.entity';

interface ICreatePermissionRoles {
  role_id?: string;
  permissions?: string[];
}

@Controller('roles/:id/permissions')
export class RolePermissionController {
  constructor(
    private readonly createRolePermissionService: CreateRolePermissionService,
  ) {}

  @Post()
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
