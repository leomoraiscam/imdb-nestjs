import { v4 as uuidv4 } from 'uuid';

import { ICreateRolesDTO } from '../../dtos/ICreateRoles.dto';
import { Role } from '../../infra/typeorm/entities/Role.entity';
import IRolesRepository from '../IRolesRepository.interface';

export class InMemoryRolesRepository implements IRolesRepository {
  private roles: Role[] = [];

  async findById(id: string): Promise<Role | undefined> {
    return this.roles.find((role) => role.id === id);
  }

  async findByIds(ids: string[]): Promise<Role[]> {
    const allRoles = this.roles.filter((role) => ids.includes(role.id));

    return allRoles;
  }

  async findByName(name: string): Promise<Role | undefined> {
    return this.roles.find((role) => role.name === name);
  }

  async create({ description, name }: ICreateRolesDTO): Promise<Role> {
    const role = new Role();

    Object.assign(role, {
      id: uuidv4(),
      name,
      description,
    });

    this.roles.push(role);

    return role;
  }

  async save(role: Role): Promise<Role> {
    const roleIndex = this.roles.findIndex(
      (roleData) => roleData.id === role.id,
    );

    this.roles[roleIndex] = role;

    return role;
  }
}
