import { Test } from '@nestjs/testing';

import { InMemoryDirectorsRepository } from '../repositories/in-memory/InMemoryDirectors.repositories';
import { ListDirectorsServices } from './ListDirectors.service';

describe('ListDirectorsService', () => {
  let listDirectorsServices: ListDirectorsServices;
  let inMemoryDirectorsRepository: InMemoryDirectorsRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ListDirectorsServices,
        {
          provide: 'DIRECTOR_REPOSITORY',
          useClass: InMemoryDirectorsRepository,
        },
      ],
    }).compile();

    listDirectorsServices = moduleRef.get<ListDirectorsServices>(
      ListDirectorsServices,
    );
    inMemoryDirectorsRepository = moduleRef.get<InMemoryDirectorsRepository>(
      'DIRECTOR_REPOSITORY',
    );
  });

  it('should be able list all actors', async () => {
    const take = 1;
    const page = 1;
    const skip = 2;

    await inMemoryDirectorsRepository.create({
      name: 'john doe 1',
      gender: 'M',
    });

    await inMemoryDirectorsRepository.create({
      name: 'john doe 2',
      gender: 'M',
    });

    await inMemoryDirectorsRepository.create({
      name: 'john doe 3',
      gender: 'M',
    });

    const actors = await listDirectorsServices.execute({
      take,
      skip,
      page,
    });

    expect(actors.length).toBe(2);
  });
});
