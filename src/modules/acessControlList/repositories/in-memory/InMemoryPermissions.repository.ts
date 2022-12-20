import { v4 as uuidv4 } from 'uuid';

import { CreatePermissionsDTO } from '../../../acessControlList/dtos/http/requests/CreatePermissions.dto';
import { Permission } from '../../infra/typeorm/entities/Permission.entity';
import { IPermissionsRepository } from '../IPermissionsRepository.interface';

export class InMemoryPermissionsRepository implements IPermissionsRepository {
  private permissions: Permission[] = [];

  async findByIds(ids: string[]): Promise<Permission[]> {
    const allPermissions = this.permissions.filter((permission) =>
      ids.includes(permission.id),
    );

    return allPermissions;
  }

  async findByName(name: string): Promise<Permission | undefined> {
    return this.permissions.find((permission) => permission.name === name);
  }

  async create({
    description,
    name,
  }: CreatePermissionsDTO): Promise<Permission> {
    const permission = new Permission();

    Object.assign(permission, {
      id: uuidv4(),
      name,
      description,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.permissions.push(permission);

    return permission;
  }
}
