import { PERMISSIONS_REPOSITORY } from '@/config/constants/repositories.constants';
import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { InMemoryPermissionsRepository } from '../repositories/in-memory/InMemoryPermissions.repository';
import { CreatePermissionService } from './CreatePermission.service';

describe('CreatePermissionsService', () => {
  let createPermissionService: CreatePermissionService;
  let inMemoryPermissionsRepository: InMemoryPermissionsRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreatePermissionService,
        {
          provide: PERMISSIONS_REPOSITORY,
          useClass: InMemoryPermissionsRepository,
        },
      ],
    }).compile();

    createPermissionService = moduleRef.get<CreatePermissionService>(
      CreatePermissionService,
    );

    inMemoryPermissionsRepository =
      moduleRef.get<InMemoryPermissionsRepository>(PERMISSIONS_REPOSITORY);
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
