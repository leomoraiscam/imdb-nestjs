import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/modules/users/infra/typeorm/entities/User.entity';
import { IUsersRepository } from 'src/modules/users/repositories/UsersRepository.interface';

import { IPermissionsRepository } from '../repositories/IPermissionsRepository.interface';
import IRolesRepository from '../repositories/IRolesRepository.interface';

interface ICreateAccessControlListToUserRequest {
  user_id: string;
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
    user_id,
  }: ICreateAccessControlListToUserRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

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
