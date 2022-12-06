import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';

import FakeHashProvider from '../providers/hashProvider/in-memory/InMemoryHash.provider';
import { InMemoryUsersRepository } from '../repositories/in-memory/InMemoryUsers.repositories';
import { UpdateUserService } from './UpdateUser.service';

describe('Update User Service', () => {
  let updateUserService: UpdateUserService;
  let inMemoryUserRepository: InMemoryUsersRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdateUserService,
        { provide: 'USER_REPOSITORY', useClass: InMemoryUsersRepository },
        { provide: 'HASH_PROVIDER', useClass: FakeHashProvider },
      ],
    }).compile();

    inMemoryUserRepository =
      moduleRef.get<InMemoryUsersRepository>('USER_REPOSITORY');

    updateUserService = moduleRef.get<UpdateUserService>(UpdateUserService);
  });

  it('should be able update an user when receive correct data', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'jonh@email.com',
      password: 'Test@123',
    });

    const userUpdated = await updateUserService.execute({
      userId: user.id,
      email: user.email,
      name: 'John Doe Two',
      oldPassword: user.password,
    });

    expect(userUpdated.email).toEqual('jonh@email.com');
    expect(userUpdated.name).toEqual('John Doe Two');
  });

  it('should not be able update an user when the same does not exist', async () => {
    await expect(
      updateUserService.execute({
        userId: 'invalid-user',
        email: 'jonhdoe@email.cm',
        name: 'John Doe Two',
        oldPassword: 'test@123',
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should not be able update an user when email already exist', async () => {
    const firstUser = await inMemoryUserRepository.create({
      name: 'John Doe two',
      email: 'jonhtwo@email.com',
      password: 'Test@123',
    });

    const secondUser = await inMemoryUserRepository.create({
      name: 'Any',
      email: 'any@email.com',
      password: 'Test@123',
    });

    await expect(
      updateUserService.execute({
        userId: secondUser.id,
        email: firstUser.email,
        name: secondUser.name,
        oldPassword: secondUser.password,
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('should be able to update the password', async () => {
    const firstUser = await inMemoryUserRepository.create({
      name: 'John Doe two',
      email: 'jonhtwo@email.com',
      password: 'Test@123',
    });

    const updatedUser = await updateUserService.execute({
      userId: firstUser.id,
      email: firstUser.email,
      name: firstUser.name,
      oldPassword: firstUser.password,
      password: 'Test@1234',
    });

    expect(updatedUser.password).toEqual('Test@1234');
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'Jonh Doe',
      email: 'joh@example.com',
      password: '123456',
    });

    await expect(
      updateUserService.execute({
        userId: user.id,
        name: 'Joe Smith',
        email: 'joe@example.com',
        password: '123123',
        oldPassword: 'wrong-old-password',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should not be able to update the password when old password is equal the new password', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'Jonh Doe',
      email: 'joh@example.com',
      password: '123456',
    });

    await expect(
      updateUserService.execute({
        userId: user.id,
        name: 'Joe Smith',
        email: 'joe@example.com',
        password: '123123',
        oldPassword: '123123',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
