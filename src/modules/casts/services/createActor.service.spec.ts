import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { InMemoryActorsRepository } from '../repositories/in-memory/InMemoryActors.repositories';
import { CreateActorService } from './CreateActor.service';

let createActorService: CreateActorService;
let inMemoryActorsRepository: InMemoryActorsRepository;

describe('CreateActorService', () => {
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateActorService,
        { provide: 'ACTOR_REPOSITORY', useClass: InMemoryActorsRepository },
      ],
    }).compile();

    inMemoryActorsRepository =
      moduleRef.get<InMemoryActorsRepository>('ACTOR_REPOSITORY');

    createActorService = moduleRef.get<CreateActorService>(CreateActorService);
  });

  it('should be able return an actor when receive correct data to create the same', async () => {
    const actor = await createActorService.execute({
      name: 'John Doe',
      gender: 'M',
    });

    expect(actor).toHaveProperty('id');
  });

  it('should not be able create an actor when the same exist', async () => {
    await inMemoryActorsRepository.create({
      name: 'John Doe',
      gender: 'M',
    });

    await expect(
      createActorService.execute({
        name: 'John Doe',
        gender: 'M',
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
