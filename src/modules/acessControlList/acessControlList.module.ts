import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PermissionController } from './infra/http/controllers/Permission.controller';
import { RolesController } from './infra/http/controllers/Role.controller';
import { Permission } from './infra/typeorm/entities/Permission.entity';
import { Role } from './infra/typeorm/entities/Role.entity';
import { PermissionsRepository } from './infra/typeorm/repositories/Permissions.repository';
import { RolesRepository } from './infra/typeorm/repositories/Roles.repository';
import { CreatePermissionService } from './services/CreatePermission.service';
import { CreateRoleService } from './services/CreateRole.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  controllers: [RolesController, PermissionController],
  providers: [
    {
      provide: 'ROLE_REPOSITORY',
      useClass: RolesRepository,
    },
    {
      provide: 'PERMISSION_REPOSITORY',
      useClass: PermissionsRepository,
    },
    CreateRoleService,
    CreatePermissionService,
  ],
})
export class AccessControlListModule {}
