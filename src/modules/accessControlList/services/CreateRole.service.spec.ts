import { BadRequestException } from '@nestjs/common';

import { InMemoryRolesRepository } from '../repositories/in-memory/InMemoryRoles.repository';
import { CreateRoleService } from './CreateRole.service';

describe('Create Roles', () => {
  let createRoleService: CreateRoleService;
  let inMemoryRolesRepository: InMemoryRolesRepository;
  beforeEach(async () => {
    inMemoryRolesRepository = new InMemoryRolesRepository();
    createRoleService = new CreateRoleService(inMemoryRolesRepository);
  });

  it('should be able to create a role', async () => {
    const role = await createRoleService.execute({
      name: 'admin',
      description: 'administration role',
    });

    expect(role).toHaveProperty('id');
  });

  it('should not be able to create a role when the same exist', async () => {
    await inMemoryRolesRepository.create({
      name: 'admin',
      description: 'administration role',
    });

    await expect(
      createRoleService.execute({
        name: 'admin',
        description: 'administration role',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
