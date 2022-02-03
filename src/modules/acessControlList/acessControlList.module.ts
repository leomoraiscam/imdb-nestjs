import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/infra/typeorm/entities/User.entity';
import { UsersRepository } from '../users/infra/typeorm/repositories/Users.repository';
import { UserAccessControlListController } from './infra/http/controllers/AccessControlList.controller';
import { PermissionController } from './infra/http/controllers/Permission.controller';
import { RolesController } from './infra/http/controllers/Role.controller';
import { RolePermissionController } from './infra/http/controllers/RolePermissions.controller';
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
    RolesController,
    PermissionController,
    RolePermissionController,
    UserAccessControlListController,
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
