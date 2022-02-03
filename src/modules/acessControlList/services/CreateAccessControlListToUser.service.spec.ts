import { InMemoryUsersRepository } from '../../users/repositories/in-memory/InMemoryUsers.repositories';
import { InMemoryPermissionsRepository } from '../repositories/in-memory/InMemoryPermissions.repository';
import { InMemoryRolesRepository } from '../repositories/in-memory/InMemoryRoles.repository';
import { CreateAccessControlListToUserService } from './CreateAccessControlListToUser.service';

describe('Crete Roles Permissions', () => {
  let createAccessControlListToUserService: CreateAccessControlListToUserService;
  let inMemoryUsersRepository: InMemoryUsersRepository;
  let inMemoryRolesRepository: InMemoryRolesRepository;
  let inMemoryPermissionsRepository: InMemoryPermissionsRepository;

  beforeEach(async () => {
    inMemoryRolesRepository = new InMemoryRolesRepository();
    inMemoryPermissionsRepository = new InMemoryPermissionsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();

    createAccessControlListToUserService =
      new CreateAccessControlListToUserService(
        inMemoryUsersRepository,
        inMemoryRolesRepository,
        inMemoryPermissionsRepository,
      );
  });

  it('should be able to create a permissions to specific role', async () => {
    const user = await inMemoryUsersRepository.create({
      email: 'email@email.com',
      name: 'John does',
      password: '123',
    });

    const role = await inMemoryRolesRepository.create({
      description: 'Role to administrator',
      name: 'Admin',
    });

    const permission = await inMemoryPermissionsRepository.create({
      description: 'permission to authorize create user',
      name: 'create_user',
    });

    const userAccessControlList =
      await createAccessControlListToUserService.execute({
        user_id: user.id,
        roles: [role.id],
        permissions: [permission.id],
      });

    expect(userAccessControlList).toHaveProperty('id');
  });
});
