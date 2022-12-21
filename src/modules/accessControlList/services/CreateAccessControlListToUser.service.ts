import { User } from '@/modules/users/infra/typeorm/entities/User.entity';
import { IUsersRepository } from '@/modules/users/repositories/UsersRepository.interface';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { IPermissionsRepository } from '../repositories/IPermissionsRepository.interface';
import IRolesRepository from '../repositories/IRolesRepository.interface';

interface ICreateAccessControlListToUserRequest {
  userId: string;
  roles: string[];
  permissions: string[];
}

@Injectable()
export class CreateAccessControlListToUserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: IUsersRepository,
    @Inject('ROLE_REPOSITORY')
    private rolesRepository: IRolesRepository,
    @Inject('PERMISSION_REPOSITORY')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  async execute({
    permissions,
    roles,
    userId,
  }: ICreateAccessControlListToUserRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const rolesExist = await this.rolesRepository.findByIds(roles);

    const permissionsExist = await this.permissionsRepository.findByIds(
      permissions,
    );

    user.roles = rolesExist;

    user.permissions = permissionsExist;

    await this.usersRepository.save(user);

    return user;
  }
}
