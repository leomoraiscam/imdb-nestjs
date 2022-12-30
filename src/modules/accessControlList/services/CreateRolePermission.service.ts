import { Inject, NotFoundException } from '@nestjs/common';

import { ICreatePermissionRolesDTO } from '../dtos/ICreatePermissionRoles.dto';
import { Role } from '../infra/typeorm/entities/Role.entity';
import { IPermissionsRepository } from '../repositories/IPermissionsRepository.interface';
import IRolesRepository from '../repositories/IRolesRepository.interface';

export class CreateRolePermissionService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private readonly rolesRepository: IRolesRepository,
    @Inject('PERMISSION_REPOSITORY')
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
