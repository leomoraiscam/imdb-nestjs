import { Inject, NotFoundException } from '@nestjs/common';

import { ICreatePermissionRoles } from '../dtos/ICreatePermissionRoles.dto';
import { Role } from '../infra/typeorm/entities/Role.entity';
import { IPermissionsRepository } from '../repositories/IPermissionsRepository.interface';
import IRolesRepository from '../repositories/IRolesRepository.interface';

export class CreateRolePermissionService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private rolesRepository: IRolesRepository,
    @Inject('PERMISSION_REPOSITORY')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  async execute({
    role_id,
    permissions,
  }: ICreatePermissionRoles): Promise<Role> {
    const role = await this.rolesRepository.findById(role_id);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const permissionsExist = await this.permissionsRepository.findByIds(
      permissions,
    );

    role.permissions = permissionsExist;

    this.rolesRepository.save(role);

    return role;
  }
}
