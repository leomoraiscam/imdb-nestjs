import { DIRECTORS_REPOSITORY } from '@/config/constants/repositories.constants';
import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { InMemoryDirectorsRepository } from '../repositories/in-memory/InMemoryDirectors.repositories';
import { CreateDirectorService } from './CreateDirector.service';

describe('CreateDirectorService', () => {
  let createDirectorService: CreateDirectorService;
  let inMemoryDirectorsRepository: InMemoryDirectorsRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateDirectorService,
        {
          provide: DIRECTORS_REPOSITORY,
          useClass: InMemoryDirectorsRepository,
        },
      ],
    }).compile();

    inMemoryDirectorsRepository =
      moduleRef.get<InMemoryDirectorsRepository>(DIRECTORS_REPOSITORY);

    createDirectorService = moduleRef.get<CreateDirectorService>(
      CreateDirectorService,
    );
  });

  it('should be able to create a director when receive correct data', async () => {
    const actor = await createDirectorService.execute({
      name: 'Nathan Reed',
      gender: 'Male',
    });

    expect(actor).toHaveProperty('id');
  });

  it('should not be able create an director when the same exist', async () => {
    const { name } = await inMemoryDirectorsRepository.create({
      name: 'Calvin Silva',
      gender: 'Male',
    });

    await expect(
      createDirectorService.execute({
        name,
        gender: 'M',
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
