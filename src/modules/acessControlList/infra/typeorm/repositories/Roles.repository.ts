import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ICreateRolesDTO } from '../../../dtos/ICreateRoles.dto';
import IRolesRepository from '../../../repositories/IRolesRepository.interface';
import { Role } from '../entities/Role.entity';

@Injectable()
export class RolesRepository implements IRolesRepository {
  constructor(
    @InjectRepository(Role)
    private repository: Repository<Role>,
  ) {}

  public async findById(id: string): Promise<Role | undefined> {
    return this.repository.findOne(id);
  }

  public async findByName(name: string): Promise<Role | undefined> {
    return this.repository.findOne({
      where: { name },
    });
  }

  public async create({ name, description }: ICreateRolesDTO): Promise<Role> {
    const role = this.repository.create({ name, description });

    await this.repository.save(role);

    return role;
  }

  public async save(role: Role): Promise<Role> {
    return this.repository.save(role);
  }
}
