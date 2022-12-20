import { BadRequestException } from '@nestjs/common';

import { InMemoryPermissionsRepository } from '../repositories/in-memory/InMemoryPermissions.repository';
import { CreatePermissionService } from './CreatePermission.service';

describe('Create Permissions', () => {
  let createPermissionService: CreatePermissionService;
  let inMemoryPermissionsRepository: InMemoryPermissionsRepository;

  beforeEach(async () => {
    inMemoryPermissionsRepository = new InMemoryPermissionsRepository();
    createPermissionService = new CreatePermissionService(
      inMemoryPermissionsRepository,
    );
  });

  it('should be able to create a role', async () => {
    const role = await createPermissionService.execute({
      name: 'Create_user',
      description: 'permission to create users',
    });

    expect(role).toHaveProperty('id');
  });

  it('should not be able to create a role when the same exist', async () => {
    const permission = await inMemoryPermissionsRepository.create({
      name: 'Create_user',
      description: 'permission to create users',
    });

    await expect(
      createPermissionService.execute({
        name: permission.name,
        description: 'permission to create users',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
