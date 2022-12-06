import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

import FakeHashProvider from '../providers/hashProvider/in-memory/InMemoryHash.provider';
import { InMemoryUsersRepository } from '../repositories/in-memory/InMemoryUsers.repositories';
import { AuthenticateUserService } from './AuthenticateUser.service';

describe('Authenticate User Service', () => {
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
        { provide: 'USER_REPOSITORY', useClass: InMemoryUsersRepository },
        { provide: 'HASH_PROVIDER', useClass: FakeHashProvider },
      ],
    }).compile();

    inMemoryUserRepository =
      moduleRef.get<InMemoryUsersRepository>('USER_REPOSITORY');

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
        email: 'any@mail.com.br',
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
