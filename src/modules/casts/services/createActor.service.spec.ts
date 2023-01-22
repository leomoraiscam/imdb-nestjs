import { ACTORS_REPOSITORY } from '@/config/constants/repositories.constants';
import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { InMemoryActorsRepository } from '../repositories/in-memory/InMemoryActors.repositories';
import { CreateActorService } from './CreateActor.service';

describe('CreateActorService', () => {
  let createActorService: CreateActorService;
  let inMemoryActorsRepository: InMemoryActorsRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateActorService,
        { provide: ACTORS_REPOSITORY, useClass: InMemoryActorsRepository },
      ],
    }).compile();

    inMemoryActorsRepository =
      moduleRef.get<InMemoryActorsRepository>(ACTORS_REPOSITORY);

    createActorService = moduleRef.get<CreateActorService>(CreateActorService);
  });

  it('should be able to create a actor when receive correct data', async () => {
    const actor = await createActorService.execute({
      name: 'Glen Henderson',
      gender: 'Male',
    });

    expect(actor).toHaveProperty('id');
  });

  it('should not be able create an actor when the same exist', async () => {
    const { name } = await inMemoryActorsRepository.create({
      name: 'Rebecca Francis',
      gender: 'Female',
    });

    await expect(
      createActorService.execute({
        name,
        gender: 'Female',
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
