import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { InMemoryDirectorsRepository } from '../repositories/in-memory/InMemoryDirectors.repositories';
import { CreateDirectorService } from './CreateDirector.service';

let createDirectorService: CreateDirectorService;
let inMemoryDirectorsRepository: InMemoryDirectorsRepository;

describe('CreateDirectorService', () => {
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateDirectorService,
        {
          provide: 'DIRECTOR_REPOSITORY',
          useClass: InMemoryDirectorsRepository,
        },
      ],
    }).compile();

    inMemoryDirectorsRepository = moduleRef.get<InMemoryDirectorsRepository>(
      'DIRECTOR_REPOSITORY',
    );

    createDirectorService = moduleRef.get<CreateDirectorService>(
      CreateDirectorService,
    );
  });

  it('should be able return an director when receive correct data to create the same', async () => {
    const actor = await createDirectorService.execute({
      name: 'John Doe',
      gender: 'M',
    });

    expect(actor).toHaveProperty('id');
  });

  it('should not be able create an director when the same exist', async () => {
    await inMemoryDirectorsRepository.create({
      name: 'John Doe',
      gender: 'M',
    });

    await expect(
      createDirectorService.execute({
        name: 'John Doe',
        gender: 'M',
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
