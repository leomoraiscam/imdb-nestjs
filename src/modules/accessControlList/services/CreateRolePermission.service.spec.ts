import {
  ROLES_REPOSITORY,
  PERMISSIONS_REPOSITORY,
} from '@/config/constants/repositories.constants';
import { Test } from '@nestjs/testing';

import { RolesEnum } from '../dtos/roles.enum';
import { InMemoryPermissionsRepository } from '../repositories/in-memory/InMemoryPermissions.repository';
import { InMemoryRolesRepository } from '../repositories/in-memory/InMemoryRoles.repository';
import { CreateRolePermissionService } from './CreateRolePermission.service';

describe('CreateRolesPermissionsService', () => {
  let createRolePermissionService: CreateRolePermissionService;
  let inMemoryRolesRepository: InMemoryRolesRepository;
  let inMemoryPermissionsRepository: InMemoryPermissionsRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateRolePermissionService,
        {
          provide: ROLES_REPOSITORY,
          useClass: InMemoryRolesRepository,
        },
        {
          provide: PERMISSIONS_REPOSITORY,
          useClass: InMemoryPermissionsRepository,
        },
      ],
    }).compile();

    createRolePermissionService = moduleRef.get<CreateRolePermissionService>(
      CreateRolePermissionService,
    );

    inMemoryPermissionsRepository =
      moduleRef.get<InMemoryPermissionsRepository>(PERMISSIONS_REPOSITORY);

    inMemoryRolesRepository =
      moduleRef.get<InMemoryRolesRepository>(ROLES_REPOSITORY);
  });

  it('should be able to create a permissions to specific role', async () => {
    const role = await inMemoryRolesRepository.create({
      description: 'Role to administrator',
      name: RolesEnum.ADMIN,
    });

    const permission = await inMemoryPermissionsRepository.create({
      description: 'permission to authorize create user',
      name: 'create_user',
    });

    const permissionsRole = await createRolePermissionService.execute({
      roleId: role.id,
      permissions: [permission.id],
    });

    expect(permissionsRole).toHaveProperty('permissions');
    expect(permissionsRole.permissions.length).toBe(1);
  });
});
