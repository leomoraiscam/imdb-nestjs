import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UsersRepository } from '../infra/typeorm/repositories/Users.repository';
import { InMemoryUsersRepository } from '../repositories/in-memory/InMemoryUsers.repositories';
import { ShowProfileUserService } from './ShowProfileUser.service';

describe('ShowProfileService', () => {
  let service: ShowProfileUserService;
  let fakeUserRepository: InMemoryUsersRepository;

  beforeEach(async () => {
    fakeUserRepository = new InMemoryUsersRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShowProfileUserService,
        {
          provide: getRepositoryToken(UsersRepository),
          useValue: fakeUserRepository,
        },
      ],
    }).compile();

    service = module.get<ShowProfileUserService>(ShowProfileUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should return an user from database', async () => {
      const user = await fakeUserRepository.create({
        email: 'teste@teste.com',
        name: 'teste',
        password: '123456',
      });

      const findUser = await service.execute({ userId: user.id });

      expect(findUser).toEqual(user);
    });

    it('should return an error if user dont exists', async () => {
      await expect(
        service.execute({ userId: 'non-existing-user' }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
