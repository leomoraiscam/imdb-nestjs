import { ACTORS_REPOSITORY } from '@/config/constants/repositories.constants';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { InMemoryActorsRepository } from '../repositories/in-memory/InMemoryActors.repositories';
import { UpdateActorService } from './UpdateActor.service';

describe('UpdateActorService', () => {
  let updateActorService: UpdateActorService;
  let inMemoryActorsRepository: InMemoryActorsRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdateActorService,
        { provide: ACTORS_REPOSITORY, useClass: InMemoryActorsRepository },
      ],
    }).compile();

    inMemoryActorsRepository =
      moduleRef.get<InMemoryActorsRepository>(ACTORS_REPOSITORY);

    updateActorService = moduleRef.get<UpdateActorService>(UpdateActorService);
  });

  it('should be able update an actor when receive correct data', async () => {
    const [firstActor] = await Promise.all([
      inMemoryActorsRepository.create({
        name: 'Glen Henderson',
        gender: 'Male',
      }),
      inMemoryActorsRepository.create({
        name: 'Rebecca Francis',
        gender: 'Female',
      }),
      inMemoryActorsRepository.create({
        name: 'Amelia Ingram',
        gender: 'Female',
      }),
    ]);

    const { id } = firstActor;

    const { name } = await updateActorService.execute({
      actorId: id,
      name: 'John Smith',
      gender: 'Male',
    });

    expect(name).toEqual('John Smith');
  });

  it('should not be able update an actor when the same does not exist', async () => {
    await expect(
      updateActorService.execute({
        actorId: 'non-exist',
        name: 'John Doe',
        gender: 'M',
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should not be able update an genre when name already exist', async () => {
    const [firstActor, secondActor] = await Promise.all([
      inMemoryActorsRepository.create({
        name: 'Glen Henderson',
        gender: 'Male',
      }),
      inMemoryActorsRepository.create({
        name: 'Rebecca Francis',
        gender: 'Female',
      }),
      inMemoryActorsRepository.create({
        name: 'Amelia Ingram',
        gender: 'Female',
      }),
    ]);

    await expect(
      updateActorService.execute({
        actorId: firstActor.id,
        name: secondActor.name,
        gender: 'Female',
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
