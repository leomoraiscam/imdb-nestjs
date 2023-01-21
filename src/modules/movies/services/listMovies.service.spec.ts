import { MOVIES_REPOSITORY } from '@/config/constants/repositories.constants';
import { Actor } from '@/modules/casts/infra/typeorm/entities/Actor.entity';
import { Director } from '@/modules/casts/infra/typeorm/entities/Direction.entity';
import { Test } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';

import { Genre } from '../infra/typeorm/entities/Genre.entity';
import { InMemoryMoviesRepository } from '../repositories/in-memory/InMemoryMovies.repository';
import { ListMoviesServices } from './ListMovies.service';

describe('ListMoviesService', () => {
  let listMoviesServices: ListMoviesServices;
  let inMemoryMoviesRepository: InMemoryMoviesRepository;
  let director: Director;
  let actor: Actor;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ListMoviesServices,
        {
          provide: MOVIES_REPOSITORY,
          useClass: InMemoryMoviesRepository,
        },
      ],
    }).compile();

    inMemoryMoviesRepository =
      moduleRef.get<InMemoryMoviesRepository>(MOVIES_REPOSITORY);

    listMoviesServices = moduleRef.get<ListMoviesServices>(ListMoviesServices);

    actor = {
      id: uuidv4(),
      name: 'Singleton',
      gender: 'male',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    director = {
      id: uuidv4(),
      name: 'Sylvia Evans',
      gender: 'female',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    const { id: directorId } = director;

    const [firstGenre, secondGenre] = [
      {
        id: uuidv4(),
        name: 'action and adventure',
        description:
          'This genre talks about characters who go through several adventures, as they are always fighting an enemy!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'action and adventure',
        description:
          'This genre talks about characters who go through several adventures, as they are always fighting an enemy!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ] as Genre[];

    await Promise.all([
      inMemoryMoviesRepository.create({
        name: 'Transforms',
        description:
          'It talks about two races of robots, the Autobots and the villainous Decepticons, arrive on Earth. Robots have the ability to transform into different mechanical objects',
        author: 'Elnora Austin',
        duration: '2h',
        year: 2010,
        genres: [firstGenre, secondGenre],
        actors: [actor],
        directorId,
        votes: [],
      }),
      inMemoryMoviesRepository.create({
        name: 'Fast and furious',
        description:
          'Film about the underworld of street racing and a series of robberies.',
        author: 'Susan Summers',
        duration: '2h30min',
        year: 2000,
        genres: [firstGenre],
        actors: [actor],
        directorId,
        votes: [],
      }),
      inMemoryMoviesRepository.create({
        name: 'Dragon ball',
        description:
          'Dragon Ball is a franchise originally started with a manga series.',
        author: 'Hester Crawford',
        duration: '1h15min',
        year: 1995,
        genres: [firstGenre],
        actors: [actor],
        directorId,
        votes: [],
      }),
    ]);
  });

  it('should be able list all movies', async () => {
    const take = 1;
    const page = 1;
    const skip = 2;

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

    const movies = await listMoviesServices.execute({
      take,
      skip,
      page,
    });

    expect(movies.length).toBe(2);
  });
});
