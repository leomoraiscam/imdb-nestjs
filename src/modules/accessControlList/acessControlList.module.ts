import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/infra/typeorm/entities/User.entity';
import { UsersRepository } from '../users/infra/typeorm/repositories/Users.repository';
import { CreateUserAccessControlListController } from './infra/http/controllers/CreateAccessControlList.controller';
import { CreatePermissionController } from './infra/http/controllers/CreatePermissions.controller';
import { CreateRolesController } from './infra/http/controllers/CreateRoles.controller';
import { CreateRolePermissionController } from './infra/http/controllers/RolePermissions.controller';
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
      provide: 'ROLE_REPOSITORY',
      useClass: RolesRepository,
    },
    {
      provide: 'PERMISSION_REPOSITORY',
      useClass: PermissionsRepository,
    },
    {
      provide: 'USER_REPOSITORY',
      useClass: UsersRepository,
    },
    CreateRoleService,
    CreatePermissionService,
    CreateRolePermissionService,
    CreateAccessControlListToUserService,
  ],
})
export class AccessControlListModule {}
