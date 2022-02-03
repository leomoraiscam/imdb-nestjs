import { Body, Controller, Param, Post } from '@nestjs/common';
import { classToClass } from 'class-transformer';
import { User } from 'src/modules/users/infra/typeorm/entities/User.entity';

import { CreateAccessControlListToUserService } from '../../../services/CreateAccessControlListToUser.service';

interface ICreateACLToUser {
  permissions: string[];
  roles: string[];
}

@Controller('users/:user_id/acl')
export class UserAccessControlListController {
  constructor(
    private readonly createAccessControlListToUserService: CreateAccessControlListToUserService,
  ) {}

  @Post()
  async handler(
    @Param('id') user_id: string,
    @Body() { permissions, roles }: ICreateACLToUser,
  ): Promise<User> {
    const permission = this.createAccessControlListToUserService.execute({
      user_id,
      permissions,
      roles,
    });

    return classToClass(permission);
  }
}
