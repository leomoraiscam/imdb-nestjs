import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { CreateRolesDTO as ICreateRolesDTO } from '../dtos/ICreateRoles.dto';
import { Role } from '../infra/typeorm/entities/Role.entity';
import { IPermissionsRepository } from '../repositories/IPermissionsRepository.interface';

@Injectable()
export class CreateRoleService {
  constructor(
    @Inject('ROLE_REPOSITORY') private rolesRepository: IPermissionsRepository,
  ) {}
  async execute({ description, name }: ICreateRolesDTO): Promise<Role> {
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
