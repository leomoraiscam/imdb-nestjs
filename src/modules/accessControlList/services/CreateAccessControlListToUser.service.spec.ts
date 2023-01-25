import {
  USERS_REPOSITORY,
  ROLES_REPOSITORY,
  PERMISSIONS_REPOSITORY,
} from '@/config/constants/repositories.constants';
import { Test } from '@nestjs/testing';

import { InMemoryUsersRepository } from '../../users/repositories/in-memory/InMemoryUsers.repositories';
import { RolesEnum } from '../dtos/roles.enum';
import { InMemoryPermissionsRepository } from '../repositories/in-memory/InMemoryPermissions.repository';
import { InMemoryRolesRepository } from '../repositories/in-memory/InMemoryRoles.repository';
import { CreateAccessControlListToUserService } from './CreateAccessControlListToUser.service';

describe('CreateAccessControlListService', () => {
  let createAccessControlListToUserService: CreateAccessControlListToUserService;
  let inMemoryUsersRepository: InMemoryUsersRepository;
  let inMemoryRolesRepository: InMemoryRolesRepository;
  let inMemoryPermissionsRepository: InMemoryPermissionsRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateAccessControlListToUserService,
        { provide: USERS_REPOSITORY, useClass: InMemoryUsersRepository },
        { provide: ROLES_REPOSITORY, useClass: InMemoryRolesRepository },
        {
          provide: PERMISSIONS_REPOSITORY,
          useClass: InMemoryPermissionsRepository,
        },
      ],
    }).compile();

    createAccessControlListToUserService =
      moduleRef.get<CreateAccessControlListToUserService>(
        CreateAccessControlListToUserService,
      );

    inMemoryUsersRepository =
      moduleRef.get<InMemoryUsersRepository>(USERS_REPOSITORY);

    inMemoryRolesRepository =
      moduleRef.get<InMemoryRolesRepository>(ROLES_REPOSITORY);

    inMemoryPermissionsRepository =
      moduleRef.get<InMemoryPermissionsRepository>(PERMISSIONS_REPOSITORY);
  });

  it('should be able to create a permissions to specific role', async () => {
    const user = await inMemoryUsersRepository.create({
      email: 'email@email.com',
      name: 'John does',
      password: '123',
    });

    const role = await inMemoryRolesRepository.create({
      description: 'Role to administrator',
      name: RolesEnum.ADMIN,
    });

    const permission = await inMemoryPermissionsRepository.create({
      description: 'permission to authorize create user',
      name: 'create_user',
    });

    const userAccessControlList =
      await createAccessControlListToUserService.execute({
        userId: user.id,
        roles: [role.id],
        permissions: [permission.id],
      });

    expect(userAccessControlList).toHaveProperty('id');
  });
});
