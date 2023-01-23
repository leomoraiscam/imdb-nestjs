import { ACTORS_REPOSITORY } from '@/config/constants/repositories.constants';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { InMemoryActorsRepository } from '../repositories/in-memory/InMemoryActors.repositories';
import { DeleteActorService } from './DeleteActor.service';

describe('DeleteActorService', () => {
  let deleteActorService: DeleteActorService;
  let inMemoryActorsRepository: InMemoryActorsRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DeleteActorService,
        { provide: ACTORS_REPOSITORY, useClass: InMemoryActorsRepository },
      ],
    }).compile();

    inMemoryActorsRepository =
      moduleRef.get<InMemoryActorsRepository>(ACTORS_REPOSITORY);

    deleteActorService = moduleRef.get<DeleteActorService>(DeleteActorService);
  });

  it('should be able delete a spefic existent actor', async () => {
    const { id } = await inMemoryActorsRepository.create({
      name: 'Isaiah Hunter',
      gender: 'Male',
    });

    await deleteActorService.execute(id);

    const findActor = await inMemoryActorsRepository.findById(id);

    expect(findActor).toBeUndefined();
  });

  it('should not be able to delete a non-existing actor', async () => {
    await expect(
      deleteActorService.execute('non-existing-actor'),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
