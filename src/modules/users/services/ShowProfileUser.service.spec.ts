import { USERS_REPOSITORY } from '@/config/constants/repositories.constants';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { InMemoryUsersRepository } from '../repositories/in-memory/InMemoryUsers.repositories';
import { ShowProfileUserService } from './ShowProfileUser.service';

describe('ShowProfileService', () => {
  let showProfileUserService: ShowProfileUserService;
  let inMemoryUserRepository: InMemoryUsersRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ShowProfileUserService,
        { provide: USERS_REPOSITORY, useClass: InMemoryUsersRepository },
      ],
    }).compile();

    inMemoryUserRepository =
      moduleRef.get<InMemoryUsersRepository>(USERS_REPOSITORY);

    showProfileUserService = moduleRef.get<ShowProfileUserService>(
      ShowProfileUserService,
    );
  });

  it('should return an user from database', async () => {
    const user = await inMemoryUserRepository.create({
      email: 'teste@teste.com',
      name: 'teste',
      password: '123456',
    });

    const findUser = await showProfileUserService.execute(user.id);

    expect(findUser).toEqual(user);
  });

  it('should return an error if user dont exists', async () => {
    await expect(
      showProfileUserService.execute('non-existing-user'),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
