import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPermissionsRepository } from 'src/modules/acessControlList/repositories/IPermissionsRepository.interface';
import { Repository } from 'typeorm';

import { ICreatePermissionsDTO } from '../../../dtos/ICreatePermissions.dto';
import { Permission } from '../entities/Permission.entity';

@Injectable()
export class PermissionsRepository implements IPermissionsRepository {
  constructor(
    @InjectRepository(Permission)
    private repository: Repository<Permission>,
  ) {}

  public async findByIds(ids: string[]): Promise<Permission[]> {
    return this.repository.findByIds(ids);
  }

  public async findByName(name: string): Promise<Permission | undefined> {
    return this.repository.findOne({
      where: { name },
    });
  }

  public async create({
    name,
    description,
  }: ICreatePermissionsDTO): Promise<Permission> {
    const role = this.repository.create({ name, description });

    await this.repository.save(role);

    return role;
  }
}
