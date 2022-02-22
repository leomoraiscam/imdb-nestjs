import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { CreatePermissionsDTO } from '../dtos/CreatePermissions.dto';
import { Permission } from '../infra/typeorm/entities/Permission.entity';
import { IPermissionsRepository } from '../repositories/IPermissionsRepository.interface';

@Injectable()
export class CreatePermissionService {
  constructor(
    @Inject('PERMISSION_REPOSITORY')
    private permissionRepository: IPermissionsRepository,
  ) {}

  async execute({
    description,
    name,
  }: CreatePermissionsDTO): Promise<Permission> {
    const permissionExist = await this.permissionRepository.findByName(name);

    if (permissionExist) {
      throw new BadRequestException('Permission already exist');
    }

    const permission = await this.permissionRepository.create({
      description,
      name,
    });

    return permission;
  }
}
