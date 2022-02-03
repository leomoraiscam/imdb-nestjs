import { InMemoryPermissionsRepository } from '../repositories/in-memory/InMemoryPermissions.repository';
import { InMemoryRolesRepository } from '../repositories/in-memory/InMemoryRoles.repository';
import { CreateRolePermissionService } from './CreateRolePermission.service';

describe('Crete Roles Permissions', () => {
  let createRolePermissionService: CreateRolePermissionService;
  let inMemoryRolesRepository: InMemoryRolesRepository;
  let inMemoryPermissionsRepository: InMemoryPermissionsRepository;

  beforeEach(async () => {
    inMemoryRolesRepository = new InMemoryRolesRepository();
    inMemoryPermissionsRepository = new InMemoryPermissionsRepository();

    createRolePermissionService = new CreateRolePermissionService(
      inMemoryRolesRepository,
      inMemoryPermissionsRepository,
    );
  });

  it('should be able to create a permissions to specific role', async () => {
    const role = await inMemoryRolesRepository.create({
      description: 'Role to administrator',
      name: 'Admin',
    });

    const permission = await inMemoryPermissionsRepository.create({
      description: 'permission to authorize create user',
      name: 'create_user',
    });

    const permissionsRole = await createRolePermissionService.execute({
      role_id: role.id,
      permissions: [permission.id],
    });

    expect(permissionsRole).toHaveProperty('permissions');
    expect(permissionsRole.permissions.length).toBe(1);
  });
});
