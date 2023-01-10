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
          provide: 'ACTOR_REPOSITORY',
          useClass: InMemoryActorsRepository,
        },
      ],
    }).compile();

    listActorsServices = moduleRef.get<ListActorsServices>(ListActorsServices);
    inMemoryActorsRepository =
      moduleRef.get<InMemoryActorsRepository>('ACTOR_REPOSITORY');
  });

  it('should be able list all actors', async () => {
    const take = 1;
    const page = 1;
    const skip = 2;

    await inMemoryActorsRepository.create({
      name: 'john doe 1',
      gender: 'M',
    });

    await inMemoryActorsRepository.create({
      name: 'john doe 2',
      gender: 'M',
    });

    await inMemoryActorsRepository.create({
      name: 'john doe 3',
      gender: 'M',
    });

    const actors = await listActorsServices.execute({
      take,
      skip,
      page,
    });

    expect(actors.length).toBe(2);
  });

  // it.skip('should be able list movies with pagination', async () => {
  //   const take = 1;
  //   const page = 1;
  //   const skip = 2;

  //   await inMemoryMoviesRepository.create({
  //     name: 'transformers',
  //     description: 'action genre',
  //     author: 'leo',
  //     duration: '1h30min',
  //     year: 2010,
  //     genres: [
  //       {
  //         id: '37b75d18-d4cf-499a-9129-b71f2c4abc76',
  //         name: 'aventura',
  //         description: 'this all movies of adventure',
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //       },
  //     ],
  //   });

  //   await inMemoryMoviesRepository.create({
  //     name: 'transformers',
  //     description: 'action genre',
  //     author: 'leo',
  //     duration: '1h30min',
  //     year: 2010,
  //     genres: [
  //       {
  //         id: '37b75d18-d4cf-499a-9129-b71f2c4abc76',
  //         name: 'aventura',
  //         description: 'this all movies of adventure',
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //       },
  //     ],
  //   });

  //   await inMemoryMoviesRepository.create({
  //     name: 'transformers',
  //     description: 'action genre',
  //     author: 'leo',
  //     duration: '1h30min',
  //     year: 2010,
  //     genres: [
  //       {
  //         id: '37b75d18-d4cf-499a-9129-b71f2c4abc76',
  //         name: 'aventura',
  //         description: 'this all movies of adventure',
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //       },
  //     ],
  //   });

  //   const movies = await listMoviesServices.execute({
  //     take,
  //     skip,
  //     page,
  //   });

  //   expect(movies.length).toBe(2);
  // });
});
