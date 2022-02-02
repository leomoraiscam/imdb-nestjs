import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { ICreatePermissionsDTO } from '../dtos/ICreatePermissions.dto';
import { Permission } from '../infra/typeorm/entities/Permission.entity';
import { IPermissionsRepository } from '../repositories/IPermissionsRepository.interface';

@Injectable()
export class CreatePermissionService {
  constructor(
    @Inject('PERMISSION_REPOSITORY')
    private permissionRepository: IPermissionsRepository,
  ) {}

  async execute({
    description,
    name,
  }: ICreatePermissionsDTO): Promise<Permission> {
    const roleExist = await this.permissionRepository.findByName(name);

    if (roleExist) {
      throw new BadRequestException('Permission already exist');
    }

    const role = await this.permissionRepository.create({
      description,
      name,
    });

    return role;
  }
}
