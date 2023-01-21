import { Actor } from '@/modules/casts/infra/typeorm/entities/Actor.entity';
import { Director } from '@/modules/casts/infra/typeorm/entities/Direction.entity';
import { InMemoryActorsRepository } from '@/modules/casts/repositories/in-memory/InMemoryActors.repositories';
import { InMemoryDirectorsRepository } from '@/modules/casts/repositories/in-memory/InMemoryDirectors.repositories';
import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { InMemoryGenresRepository } from '../repositories/in-memory/InMemoryGenres.repository';
import { InMemoryMoviesRepository } from '../repositories/in-memory/InMemoryMovies.repository';
import { CreateMovieService } from './CreateMovie.service';

describe('Create Movie', () => {
  let createMovieService: CreateMovieService;
  let inMemoryMoviesRepository: InMemoryMoviesRepository;
  let inMemoryGenresRepository: InMemoryGenresRepository;
  let inMemoryDirectorRepository: InMemoryDirectorsRepository;
  let inMemoryActorsRepository: InMemoryActorsRepository;
  let actor: Actor;
  let director: Director;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateMovieService,
        { provide: 'MOVIE_REPOSITORY', useClass: InMemoryMoviesRepository },
        { provide: 'GENRE_REPOSITORY', useClass: InMemoryGenresRepository },
        {
          provide: 'DIRECTOR_REPOSITORY',
          useClass: InMemoryDirectorsRepository,
        },
        { provide: 'ACTOR_REPOSITORY', useClass: InMemoryActorsRepository },
      ],
    }).compile();

    inMemoryMoviesRepository =
      moduleRef.get<InMemoryMoviesRepository>('MOVIE_REPOSITORY');

    inMemoryGenresRepository =
      moduleRef.get<InMemoryGenresRepository>('GENRE_REPOSITORY');

    inMemoryDirectorRepository = moduleRef.get<InMemoryDirectorsRepository>(
      'DIRECTOR_REPOSITORY',
    );

    inMemoryActorsRepository =
      moduleRef.get<InMemoryActorsRepository>('ACTOR_REPOSITORY');

    createMovieService = moduleRef.get<CreateMovieService>(CreateMovieService);

    [actor, director] = await Promise.all([
      inMemoryActorsRepository.create({
        name: 'Singleton',
        gender: 'male',
      }),
      inMemoryDirectorRepository.create({
        name: 'Sylvia Evans',
        gender: 'female',
      }),
    ]);
  });

  it('should be able to create a movie when receive correct data', async () => {
    const { id: actorId } = actor;
    const { id: directorId } = director;

    const [firstGenre, secondGenre] = await Promise.all([
      inMemoryGenresRepository.create({
        name: 'action and adventure',
        description:
          'This genre talks about characters who go through several adventures, as they are always fighting an enemy!',
      }),
      inMemoryGenresRepository.create({
        name: 'comedy',
        description: 'This genre is known for being light and fun.',
      }),
    ]);

    const movie = await createMovieService.execute({
      name: 'Fast and furious',
      description:
        'Film about the underworld of street racing and a series of robberies.',
      author: 'Susan Summers',
      duration: '2h30min',
      year: 2010,
      genreIds: [firstGenre.id, secondGenre.id],
      actorIds: [actorId],
      directorId,
    });

    expect(movie).toHaveProperty('id');
  });

  it('should not be able to create a movie when the same exist', async () => {
    const { id: actorId } = actor;
    const { id: directorId } = director;

    const [firstGenre, secondGenre] = await Promise.all([
      inMemoryGenresRepository.create({
        name: 'action and adventure',
        description:
          'This genre talks about characters who go through several adventures, as they are always fighting an enemy!',
      }),
      inMemoryGenresRepository.create({
        name: 'comedy',
        description: 'This genre is known for being light and fun.',
      }),
    ]);

    const { name, description, author, duration, year } =
      await inMemoryMoviesRepository.create({
        name: 'Transforms',
        description:
          'It talks about two races of robots, the Autobots and the villainous Decepticons, arrive on Earth. Robots have the ability to transform into different mechanical objects',
        author: 'Elnora Austin',
        duration: '2h',
        year: 2010,
        genres: [firstGenre, secondGenre],
        actors: [actor],
        directorId,
      });

    await expect(
      createMovieService.execute({
        name,
        description: description,
        author,
        duration,
        year,
        genreIds: [firstGenre.id, secondGenre.id],
        actorIds: [actorId],
        directorId,
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
