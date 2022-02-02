import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import { FakeUsersRepository } from '../repositories/in-memory/UsersRepositories';
import { ShowProfileService } from './ShowProfile.service';

describe('ShowProfileService', () => {
  let service: ShowProfileService;
  let fakeUserRepository: FakeUsersRepository;

  beforeEach(async () => {
    fakeUserRepository = new FakeUsersRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShowProfileService,
        {
          provide: getRepositoryToken(UsersRepository),
          useValue: fakeUserRepository,
        },
      ],
    }).compile();

    service = module.get<ShowProfileService>(ShowProfileService);
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
