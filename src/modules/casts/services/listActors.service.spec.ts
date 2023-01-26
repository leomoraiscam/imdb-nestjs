import { ACTORS_REPOSITORY } from '@/config/constants/repositories.constants';
import { Test } from '@nestjs/testing';

import { InMemoryActorsRepository } from '../repositories/in-memory/InMemoryActors.repositories';
import { ListActorsServices } from './ListActors.service';

describe('ListActorsService', () => {
  let listActorsServices: ListActorsServices;
  let inMemoryActorsRepository: InMemoryActorsRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ListActorsServices,
        {
          provide: ACTORS_REPOSITORY,
          useClass: InMemoryActorsRepository,
        },
      ],
    }).compile();

    inMemoryActorsRepository =
      moduleRef.get<InMemoryActorsRepository>(ACTORS_REPOSITORY);

    listActorsServices = moduleRef.get<ListActorsServices>(ListActorsServices);

    await Promise.all([
      inMemoryActorsRepository.create({
        name: 'Glen Henderson',
        gender: 'Female',
      }),
      inMemoryActorsRepository.create({
        name: 'Franklin Chandler',
        gender: 'Male',
      }),
      inMemoryActorsRepository.create({
        name: 'Maggie Henderson',
        gender: 'Female',
      }),
    ]);
  });

  it('should be able list all actors with default pagination values', async () => {
    const actors = await listActorsServices.execute({});

    expect(actors.length).toBe(3);
  });

  it('should be able list actors with custom pagination values', async () => {
    const page = 1;
    const perPage = 2;

    const actors = await listActorsServices.execute({
      perPage,
      page,
    });

    expect(actors.length).toBe(2);
  });

  it('should be able list actors in second page with two objects', async () => {
    const page = 2;
    const perPage = 1;

    const actors = await listActorsServices.execute({
      perPage,
      page,
    });

    expect(actors.length).toBe(1);
  });

  it('should be able list actors in second page with insufficient objects', async () => {
    const page = 2;
    const perPage = 10;

    const actors = await listActorsServices.execute({
      perPage,
      page,
    });

    expect(actors.length).toBe(0);
  });

  it('should be able list actors with default pagination and filter by name', async () => {
    const actors = await listActorsServices.execute({
      name: 'Henderson',
    });

    expect(actors.length).toBe(1);
  });

  it('should be able list actors with custom pagination and filter by name', async () => {
    const keyword = 'Henderson';
    const page = 3;
    const perPage = 8;

    const actors = await listActorsServices.execute({
      keyword,
      page,
      perPage,
    });

    expect(actors.length).toBe(0);
  });
});
