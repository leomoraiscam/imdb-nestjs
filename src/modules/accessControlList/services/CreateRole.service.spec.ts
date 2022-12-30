import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { InMemoryRolesRepository } from '../repositories/in-memory/InMemoryRoles.repository';
import { CreateRoleService } from './CreateRole.service';

describe('CreateRolesService', () => {
  let createRoleService: CreateRoleService;
  let inMemoryRolesRepository: InMemoryRolesRepository;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateRoleService,
        {
          provide: 'ROLE_REPOSITORY',
          useClass: InMemoryRolesRepository,
        },
      ],
    }).compile();

    createRoleService = moduleRef.get<CreateRoleService>(CreateRoleService);

    inMemoryRolesRepository =
      moduleRef.get<InMemoryRolesRepository>('ROLE_REPOSITORY');
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
