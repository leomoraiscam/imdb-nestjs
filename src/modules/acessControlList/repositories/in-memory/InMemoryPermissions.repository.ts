import { v4 as uuidv4 } from 'uuid';

import { ICreateRolesDTO } from '../../dtos/ICreateRoles.dto';
import { Permission } from '../../infra/typeorm/entities/Permission.entity';
import { IPermissionsRepository } from '../IPermissionsRepository.interface';

export class InMemoryPermissionsRepository implements IPermissionsRepository {
  private permissions: Permission[] = [];

  async findByName(name: string): Promise<Permission | undefined> {
    return this.permissions.find((permission) => permission.name === name);
  }

  async create({ description, name }: ICreateRolesDTO): Promise<Permission> {
    const permission = new Permission();

    Object.assign(permission, {
      id: uuidv4(),
      name,
      description,
    });

    this.permissions.push(permission);

    return permission;
  }
}
