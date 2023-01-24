import {
  MOVIES_REPOSITORY,
  VOTES_REPOSITORY,
} from '@/config/constants/repositories.constants';
import { Actor } from '@/modules/casts/infra/typeorm/entities/Actor.entity';
import { Director } from '@/modules/casts/infra/typeorm/entities/Direction.entity';
import { User } from '@/modules/users/infra/typeorm/entities/User.entity';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';

import { InMemoryMoviesRepository } from '../repositories/in-memory/InMemoryMovies.repository';
import { InMemoryVotesRepository } from '../repositories/in-memory/InMemoryVotes.repository';
import { CreateVotesToMovieService } from './CreateVotesToMovie.service';

describe('CreateVotesToMovieService', () => {
  let createVotesToMovieService: CreateVotesToMovieService;
  let inMemoryMoviesRepository: InMemoryMoviesRepository;
  let inMemoryVotesRepository: InMemoryVotesRepository;

  let actor: Actor;
  let user: User;
  let director: Director;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateVotesToMovieService,
        { provide: MOVIES_REPOSITORY, useClass: InMemoryMoviesRepository },
        { provide: VOTES_REPOSITORY, useClass: InMemoryVotesRepository },
      ],
    }).compile();

    inMemoryMoviesRepository =
      moduleRef.get<InMemoryMoviesRepository>(MOVIES_REPOSITORY);

    inMemoryVotesRepository =
      moduleRef.get<InMemoryVotesRepository>(VOTES_REPOSITORY);

    createVotesToMovieService = moduleRef.get<CreateVotesToMovieService>(
      CreateVotesToMovieService,
    );

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

    user = {
      id: uuidv4(),
      name: 'Lenora Obrien',
      email: 'du@saggi.ae',
      password: 'Test1234',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      permissions: [],
      roles: [],
    };
  });

  it('should be able to create a vote to specific movie when receive correct data', async () => {
    const { id: directorId } = director;

    const [firstGenre, secondGenre] = [
      {
        id: uuidv4(),
        name: 'action and adventure',
        description:
          'This genre talks about characters who go through several adventures, as they are always fighting an enemy!',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'comedy',
        description: 'This genre is known for being light and fun.',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];

    const movie = await inMemoryMoviesRepository.create({
      name: 'Fast and furious',
      description:
        'Film about the underworld of street racing and a series of robberies.',
      author: 'Susan Summers',
      duration: '2h30min',
      year: 2010,
      genres: [firstGenre, secondGenre],
      actors: [actor],
      directorId,
      votes: [],
    });

    const vote = await createVotesToMovieService.execute({
      movieId: movie.id,
      userId: user.id,
      note: 5,
    });

    movie.votes.push(vote);

    const movieAvg = await inMemoryMoviesRepository.findById(movie.id);

    expect(vote).toHaveProperty('id');
    expect(movieAvg.votes.length).toBe(1);
  });

  it('should be able to update a vote when the same exist to specific movie from user', async () => {
    const { id: directorId } = director;

    const [firstGenre, secondGenre] = [
      {
        id: uuidv4(),
        name: 'action and adventure',
        description:
          'This genre talks about characters who go through several adventures, as they are always fighting an enemy!',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'comedy',
        description: 'This genre is known for being light and fun.',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];

    const movie = await inMemoryMoviesRepository.create({
      name: 'Fast and furious',
      description:
        'Film about the underworld of street racing and a series of robberies.',
      author: 'Susan Summers',
      duration: '2h30min',
      year: 2010,
      genres: [firstGenre, secondGenre],
      actors: [actor],
      directorId,
      votes: [],
    });

    const firstVote = await inMemoryVotesRepository.create({
      movieId: movie.id,
      userId: user.id,
      note: 2,
    });

    movie.votes.push(firstVote);

    await createVotesToMovieService.execute({
      movieId: movie.id,
      userId: user.id,
      note: 5,
    });

    const movieAvg = await inMemoryMoviesRepository.findById(movie.id);

    expect(movieAvg.votes[0].note).toBe(5);
    expect(movieAvg.votes.length).toBe(1);
  });

  it('should not be able to create a vote when movie doesnt exist', async () => {
    await expect(
      createVotesToMovieService.execute({
        movieId: 'non-exist',
        userId: user.id,
        note: 5,
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
