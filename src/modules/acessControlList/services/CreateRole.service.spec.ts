import { BadRequestException } from '@nestjs/common';

import { InMemoryRolesRepository } from '../repositories/in-memory/InMemoryRoles.repository';
import { CreateRoleService } from './CreateRole.service';

describe('Crete Roles', () => {
  let createRoleService: CreateRoleService;
  let inMemoryRolesRepository: InMemoryRolesRepository;
  beforeEach(async () => {
    inMemoryRolesRepository = new InMemoryRolesRepository();
    createRoleService = new CreateRoleService(inMemoryRolesRepository);
  });

  it('should be able to create a role', async () => {
    const role = await createRoleService.execute({
      name: 'Admin',
      description: 'administration role',
    });

    expect(role).toHaveProperty('id');
  });

  it('should not be able to create a role when the same exist', async () => {
    const role = await inMemoryRolesRepository.create({
      name: 'Admin',
      description: 'administration role',
    });

    await expect(
      createRoleService.execute({
        name: role.name,
        description: 'administration role',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
