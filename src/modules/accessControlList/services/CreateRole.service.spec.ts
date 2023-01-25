import { ROLES_REPOSITORY } from '@/config/constants/repositories.constants';
import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { RolesEnum } from '../dtos/roles.enum';
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
          provide: ROLES_REPOSITORY,
          useClass: InMemoryRolesRepository,
        },
      ],
    }).compile();

    createRoleService = moduleRef.get<CreateRoleService>(CreateRoleService);

    inMemoryRolesRepository =
      moduleRef.get<InMemoryRolesRepository>(ROLES_REPOSITORY);
  });

  it('should be able to create a role', async () => {
    const role = await createRoleService.execute({
      name: RolesEnum.ADMIN,
      description: 'administration role',
    });

    expect(role).toHaveProperty('id');
  });

  it('should not be able to create a role when the same exist', async () => {
    await inMemoryRolesRepository.create({
      name: RolesEnum.ADMIN,
      description: 'administration role',
    });

    await expect(
      createRoleService.execute({
        name: RolesEnum.ADMIN,
        description: 'administration role',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
