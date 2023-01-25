import { PERMISSIONS_REPOSITORY } from '@/config/constants/repositories.constants';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { CreatePermissionsDTO } from '../dtos/http/requests/CreatePermissions.dto';
import { Permission } from '../infra/typeorm/entities/Permission.entity';
import { IPermissionsRepository } from '../repositories/IPermissionsRepository.interface';

@Injectable()
export class CreatePermissionService {
  constructor(
    @Inject(PERMISSIONS_REPOSITORY)
    private readonly permissionRepository: IPermissionsRepository,
  ) {}

  async execute({
    description,
    name,
  }: CreatePermissionsDTO): Promise<Permission> {
    const checkPermissionExist = await this.permissionRepository.findByName(
      name,
    );

    if (checkPermissionExist) {
      throw new BadRequestException('Permission already exist');
    }

    const permission = await this.permissionRepository.create({
      description,
      name,
    });

    return permission;
  }
}
