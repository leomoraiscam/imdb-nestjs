import {
  ROLES_REPOSITORY,
  PERMISSIONS_REPOSITORY,
} from '@/config/constants/repositories.constants';
import { Inject, NotFoundException } from '@nestjs/common';

import { ICreatePermissionsRoleDTO } from '../dtos/ICreatePermissionsRole.dto';
import { Role } from '../infra/typeorm/entities/Role.entity';
import { IPermissionsRepository } from '../repositories/IPermissionsRepository.interface';
import IRolesRepository from '../repositories/IRolesRepository.interface';

export class CreatePermissionsRoleService {
  constructor(
    @Inject(ROLES_REPOSITORY)
    private readonly rolesRepository: IRolesRepository,
    @Inject(PERMISSIONS_REPOSITORY)
    private readonly permissionsRepository: IPermissionsRepository,
  ) {}

  async execute({
    roleId,
    permissions,
  }: ICreatePermissionsRoleDTO): Promise<Role> {
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
