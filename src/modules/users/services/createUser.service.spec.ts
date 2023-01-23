import { HASH_PROVIDER } from '@/config/constants/providers.constants';
import { USERS_REPOSITORY } from '@/config/constants/repositories.constants';
import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { InMemoryHashProvider } from '../providers/hashProvider/in-memory/InMemoryHash.provider';
import { InMemoryUsersRepository } from '../repositories/in-memory/InMemoryUsers.repositories';
import { CreateUserService } from './CreateUser.service';

describe('CreateUserService', () => {
  let createUserService: CreateUserService;
  let inMemoryUserRepository: InMemoryUsersRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserService,
        { provide: USERS_REPOSITORY, useClass: InMemoryUsersRepository },
        { provide: HASH_PROVIDER, useClass: InMemoryHashProvider },
      ],
    }).compile();

    inMemoryUserRepository =
      moduleRef.get<InMemoryUsersRepository>(USERS_REPOSITORY);

    createUserService = moduleRef.get<CreateUserService>(CreateUserService);
  });

  it('should be able return an user when receive correct data to create the same', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'jonh@email.com',
      password: 'Test@123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able create an user when the same exist', async () => {
    await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'jonh@email.com',
      password: 'Test@123',
    });

    await expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'jonh@email.com',
        password: 'Test@123',
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
