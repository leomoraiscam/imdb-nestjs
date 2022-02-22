import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { CreateRolesDTO } from '../dtos/CreateRoles.dto';
import { Role } from '../infra/typeorm/entities/Role.entity';
import { IPermissionsRepository } from '../repositories/IPermissionsRepository.interface';

@Injectable()
export class CreateRoleService {
  constructor(
    @Inject('ROLE_REPOSITORY') private rolesRepository: IPermissionsRepository,
  ) {}
  async execute({ description, name }: CreateRolesDTO): Promise<Role> {
    const roleExist = await this.rolesRepository.findByName(name);

    if (roleExist) {
      throw new BadRequestException('Role already exist');
    }

    const role = await this.rolesRepository.create({
      description,
      name,
    });

    return role;
  }
}
