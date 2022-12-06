import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { InMemoryUsersRepository } from '../repositories/in-memory/InMemoryUsers.repositories';
import { ShowProfileUserService } from './ShowProfileUser.service';

describe('ShowProfileService', () => {
  let service: ShowProfileUserService;
  let fakeUserRepository: InMemoryUsersRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ShowProfileUserService,
        { provide: 'USER_REPOSITORY', useClass: InMemoryUsersRepository },
      ],
    }).compile();

    fakeUserRepository =
      moduleRef.get<InMemoryUsersRepository>('USER_REPOSITORY');

    service = moduleRef.get<ShowProfileUserService>(ShowProfileUserService);
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

      const findUser = await service.execute(user.id);

      expect(findUser).toEqual(user);
    });

    it('should return an error if user dont exists', async () => {
      await expect(service.execute('non-existing-user')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
});
