import { Test } from '@nestjs/testing';

import { InMemoryMoviesRepository } from '../repositories/in-memory/InMemoryMovies.repository';
import { ListMoviesServices } from './ListMovies.service';

describe('ListMoviesService', () => {
  let listMoviesServices: ListMoviesServices;
  let inMemoryMoviesRepository: InMemoryMoviesRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ListMoviesServices,
        {
          provide: 'MOVIE_REPOSITORY',
          useClass: InMemoryMoviesRepository,
        },
      ],
    }).compile();

    listMoviesServices = moduleRef.get<ListMoviesServices>(ListMoviesServices);
    inMemoryMoviesRepository =
      moduleRef.get<InMemoryMoviesRepository>('MOVIE_REPOSITORY');
  });

  it('should be able list all terms', async () => {
    const take = 1;
    const page = 1;
    const skip = 2;

    await inMemoryMoviesRepository.create({
      name: 'transformers',
      description: 'action genre',
      author: 'leo',
      duration: '1h30min',
      year: 2010,
      genres: [
        {
          id: '37b75d18-d4cf-499a-9129-b71f2c4abc76',
          name: 'aventura',
          description: 'this all movies of adventure',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });

    await inMemoryMoviesRepository.create({
      name: 'transformers',
      description: 'action genre',
      author: 'leo',
      duration: '1h30min',
      year: 2010,
      genres: [
        {
          id: '37b75d18-d4cf-499a-9129-b71f2c4abc76',
          name: 'aventura',
          description: 'this all movies of adventure',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });

    await inMemoryMoviesRepository.create({
      name: 'transformers',
      description: 'action genre',
      author: 'leo',
      duration: '1h30min',
      year: 2010,
      genres: [
        {
          id: '37b75d18-d4cf-499a-9129-b71f2c4abc76',
          name: 'aventura',
          description: 'this all movies of adventure',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });

    const movies = await listMoviesServices.execute({
      take,
      skip,
      page,
    });

    expect(movies.length).toBe(2);
  });

  it('should be able list movies with pagination', async () => {
    const take = 1;
    const page = 1;
    const skip = 2;

    await inMemoryMoviesRepository.create({
      name: 'transformers',
      description: 'action genre',
      author: 'leo',
      duration: '1h30min',
      year: 2010,
      genres: [
        {
          id: '37b75d18-d4cf-499a-9129-b71f2c4abc76',
          name: 'aventura',
          description: 'this all movies of adventure',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });

    await inMemoryMoviesRepository.create({
      name: 'transformers',
      description: 'action genre',
      author: 'leo',
      duration: '1h30min',
      year: 2010,
      genres: [
        {
          id: '37b75d18-d4cf-499a-9129-b71f2c4abc76',
          name: 'aventura',
          description: 'this all movies of adventure',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });

    await inMemoryMoviesRepository.create({
      name: 'transformers',
      description: 'action genre',
      author: 'leo',
      duration: '1h30min',
      year: 2010,
      genres: [
        {
          id: '37b75d18-d4cf-499a-9129-b71f2c4abc76',
          name: 'aventura',
          description: 'this all movies of adventure',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });

    const movies = await listMoviesServices.execute({
      take,
      skip,
      page,
    });

    expect(movies.length).toBe(2);
  });
});
