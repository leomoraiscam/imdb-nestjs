import {
  ROLES_REPOSITORY,
  PERMISSIONS_REPOSITORY,
} from '@/config/constants/repositories.constants';
import { Inject, NotFoundException } from '@nestjs/common';

import { ICreatePermissionRolesDTO } from '../dtos/ICreatePermissionRoles.dto';
import { Role } from '../infra/typeorm/entities/Role.entity';
import { IPermissionsRepository } from '../repositories/IPermissionsRepository.interface';
import IRolesRepository from '../repositories/IRolesRepository.interface';

export class CreateRolePermissionService {
  constructor(
    @Inject(ROLES_REPOSITORY)
    private readonly rolesRepository: IRolesRepository,
    @Inject(PERMISSIONS_REPOSITORY)
    private readonly permissionsRepository: IPermissionsRepository,
  ) {}

  async execute({
    roleId,
    permissions,
  }: ICreatePermissionRolesDTO): Promise<Role> {
    const role = await this.rolesRepository.findById(roleId);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const permissionsExist = await this.permissionsRepository.findByIds(
      permissions,
    );

    Object.assign(role, {
      permissions: permissionsExist,
    });

    this.rolesRepository.save(role);

    return role;
  }
}
