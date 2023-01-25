import {
  ROLES_REPOSITORY,
  PERMISSIONS_REPOSITORY,
  USERS_REPOSITORY,
} from '@/config/constants/repositories.constants';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/infra/typeorm/entities/User.entity';
import { UsersRepository } from '../users/infra/typeorm/repositories/Users.repository';
import { CreateUserAccessControlListController } from './infra/http/controllers/CreateAccessControlList.controller';
import { CreatePermissionController } from './infra/http/controllers/CreatePermissions.controller';
import { CreateRolePermissionController } from './infra/http/controllers/CreateRolePermissions.controller';
import { CreateRolesController } from './infra/http/controllers/CreateRoles.controller';
import { Permission } from './infra/typeorm/entities/Permission.entity';
import { Role } from './infra/typeorm/entities/Role.entity';
import { PermissionsRepository } from './infra/typeorm/repositories/Permissions.repository';
import { RolesRepository } from './infra/typeorm/repositories/Roles.repository';
import { CreateAccessControlListToUserService } from './services/CreateAccessControlListToUser.service';
import { CreatePermissionService } from './services/CreatePermission.service';
import { CreateRoleService } from './services/CreateRole.service';
import { CreateRolePermissionService } from './services/CreateRolePermission.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission, User])],
  controllers: [
    CreateRolesController,
    CreatePermissionController,
    CreateRolePermissionController,
    CreateUserAccessControlListController,
  ],
  providers: [
    {
      provide: ROLES_REPOSITORY,
      useClass: RolesRepository,
    },
    {
      provide: PERMISSIONS_REPOSITORY,
      useClass: PermissionsRepository,
    },
    {
      provide: USERS_REPOSITORY,
      useClass: UsersRepository,
    },
    CreateRoleService,
    CreatePermissionService,
    CreateRolePermissionService,
    CreateAccessControlListToUserService,
  ],
})
export class AccessControlListModule {}
