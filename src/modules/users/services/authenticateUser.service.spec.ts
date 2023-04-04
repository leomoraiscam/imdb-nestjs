import {
  DATE_PROVIDER,
  HASH_PROVIDER,
} from '@/config/constants/providers.constants';
import {
  USERS_REPOSITORY,
  USERS_TOKENS_REPOSITORY,
} from '@/config/constants/repositories.constants';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

import { InMemoryDateProvider } from '../providers/dateProvider/in-memory/InMemoryDate.provider';
import { InMemoryHashProvider } from '../providers/hashProvider/in-memory/InMemoryHash.provider';
import { InMemoryUsersRepository } from '../repositories/in-memory/InMemoryUsers.repositories';
import { InMemoryUsersTokensRepository } from '../repositories/in-memory/InMemoryUsersTokens.repository';
import { AuthenticateUserService } from './AuthenticateUser.service';

describe('AuthenticateUserService', () => {
  let authenticateUserService: AuthenticateUserService;
  let inMemoryUserRepository: InMemoryUsersRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthenticateUserService,
        {
          provide: JwtService,
          useValue: {
            verify: jest.fn(() => 'accessToken'),
            sign: jest.fn(() => 'accessToken'),
          },
        },
        { provide: USERS_REPOSITORY, useClass: InMemoryUsersRepository },
        { provide: HASH_PROVIDER, useClass: InMemoryHashProvider },
        {
          provide: USERS_TOKENS_REPOSITORY,
          useClass: InMemoryUsersTokensRepository,
        },
        {
          provide: DATE_PROVIDER,
          useClass: InMemoryDateProvider,
        },
      ],
    }).compile();

    inMemoryUserRepository =
      moduleRef.get<InMemoryUsersRepository>(USERS_REPOSITORY);

    authenticateUserService = moduleRef.get<AuthenticateUserService>(
      AuthenticateUserService,
    );
  });

  it('should be able return an user token when receive correct data', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'jonh@email.com',
      password: 'Test@123',
    });

    const token = await authenticateUserService.execute({
      email: user.email,
      password: user.password,
    });

    expect(token).toHaveProperty('token');
  });

  it('should not be able authenticate user when the same does not exist', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'jmail@mail.com.br',
        password: '123@Test',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('should not be able return a token when receive incorrect password', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'jonh@email.com',
      password: 'Test@123',
    });

    await expect(
      authenticateUserService.execute({
        email: user.email,
        password: '123@Test',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
