import { Body, Controller, Post } from '@nestjs/common';
import { classToClass } from 'class-transformer';

import { ICreatePermissionsDTO } from '../../../dtos/ICreatePermissions.dto';
import { CreatePermissionService } from '../../../services/CreatePermission.service';
import { Permission } from '../../typeorm/entities/Permission.entity';

@Controller('permissions')
export class PermissionController {
  constructor(
    private readonly createPermissionService: CreatePermissionService,
  ) {}

  @Post()
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
