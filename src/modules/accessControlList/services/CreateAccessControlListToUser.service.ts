import { User } from '@/modules/users/infra/typeorm/entities/User.entity';
import { IUsersRepository } from '@/modules/users/repositories/UsersRepository.interface';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CreateACLToUserDTO } from '../dtos/http/requests/CreateAccessControlListToUser.dto';
import { IPermissionsRepository } from '../repositories/IPermissionsRepository.interface';
import IRolesRepository from '../repositories/IRolesRepository.interface';

@Injectable()
export class CreateAccessControlListToUserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly usersRepository: IUsersRepository,
    @Inject('ROLE_REPOSITORY')
    private readonly rolesRepository: IRolesRepository,
    @Inject('PERMISSION_REPOSITORY')
    private readonly permissionsRepository: IPermissionsRepository,
  ) {}

  async execute({
    permissions,
    roles,
    userId,
  }: CreateACLToUserDTO): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const rolesExist = await this.rolesRepository.findByIds(roles);

    const permissionsExist = await this.permissionsRepository.findByIds(
      permissions,
    );

    Object.assign(user, {
      roles: rolesExist,
      permissions: permissionsExist,
    });

    await this.usersRepository.save(user);

    return user;
  }
}
