import { MOVIES_REPOSITORY } from '@/config/constants/repositories.constants';
import { Actor } from '@/modules/casts/infra/typeorm/entities/Actor.entity';
import { Director } from '@/modules/casts/infra/typeorm/entities/Direction.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';

import { Genre } from '../infra/typeorm/entities/Genre.entity';
import { InMemoryMoviesRepository } from '../repositories/in-memory/InMemoryMovies.repository';
import { UpdateMovieService } from './UpdateMovie.service';

let updateMovieService: UpdateMovieService;
let inMemoryMoviesRepository: InMemoryMoviesRepository;
let director: Director;
let actor: Actor;
let genre: Genre;

describe('UpdateMovieService', () => {
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdateMovieService,
        { provide: MOVIES_REPOSITORY, useClass: InMemoryMoviesRepository },
      ],
    }).compile();

    inMemoryMoviesRepository =
      moduleRef.get<InMemoryMoviesRepository>(MOVIES_REPOSITORY);

    updateMovieService = moduleRef.get<UpdateMovieService>(UpdateMovieService);

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

    genre = {
      id: uuidv4(),
      name: 'action and adventure',
      description:
        'This genre talks about characters who go through several adventures, as they are always fighting an enemy!',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  it('should be able update an movie when receive correct data', async () => {
    const { id: directorId } = director;

    const [firstMovie] = await Promise.all([
      inMemoryMoviesRepository.create({
        name: 'Transforms',
        description:
          'It talks about two races of robots, the Autobots and the villainous Decepticons, arrive on Earth. Robots have the ability to transform into different mechanical objects',
        author: 'Elnora Austin',
        duration: '2h',
        year: 2010,
        genres: [genre],
        actors: [actor],
        directorId,
      }),
      inMemoryMoviesRepository.create({
        name: 'Fast and furious',
        description:
          'Film about the underworld of street racing and a series of robberies.',
        author: 'Susan Summers',
        duration: '2h30min',
        year: 2000,
        genres: [genre],
        actors: [actor],
        directorId,
      }),
    ]);

    const updatedMovie = await updateMovieService.execute({
      movieId: firstMovie.id,
      name: 'Transforms - the last knight',
    });

    expect(updatedMovie.name).toBe('Transforms - the last knight');
  });

  it('should not be able update an movie when the same does not exist', async () => {
    await expect(
      updateMovieService.execute({
        movieId: 'non-exist',
        name: 'Fast and furious',
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should not be able update an movie when name already exist', async () => {
    const { id: directorId } = director;

    const [firstMovie, secondMovie] = await Promise.all([
      inMemoryMoviesRepository.create({
        name: 'Transforms',
        description:
          'It talks about two races of robots, the Autobots and the villainous Decepticons, arrive on Earth. Robots have the ability to transform into different mechanical objects',
        author: 'Elnora Austin',
        duration: '2h',
        year: 2010,
        genres: [genre],
        actors: [actor],
        directorId,
      }),
      inMemoryMoviesRepository.create({
        name: 'Fast and furious',
        description:
          'Film about the underworld of street racing and a series of robberies.',
        author: 'Susan Summers',
        duration: '2h30min',
        year: 2000,
        genres: [genre],
        actors: [actor],
        directorId,
      }),
      inMemoryMoviesRepository.create({
        name: 'Dragon ball',
        description:
          'Dragon Ball is a franchise originally started with a manga series.',
        author: 'Hester Crawford',
        duration: '1h15min',
        year: 1995,
        genres: [genre],
        actors: [actor],
        directorId,
      }),
    ]);

    await expect(
      updateMovieService.execute({
        movieId: firstMovie.id,
        name: secondMovie.name,
        description: 'Dragon ball',
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
