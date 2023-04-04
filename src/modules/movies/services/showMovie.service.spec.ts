import { MOVIES_REPOSITORY } from '@/config/constants/repositories.constants';
import { Actor } from '@/modules/casts/infra/typeorm/entities/Actor.entity';
import { Director } from '@/modules/casts/infra/typeorm/entities/Director.entity';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';

import { Genre } from '../infra/typeorm/entities/Genre.entity';
import { InMemoryMoviesRepository } from '../repositories/in-memory/InMemoryMovies.repository';
import { ShowMovieService } from './ShowMovie.service';

describe('ShowMovieService', () => {
  let showMovieService: ShowMovieService;
  let inMemoryMoviesRepository: InMemoryMoviesRepository;
  let director: Director;
  let actor: Actor;
  let genre: Genre;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ShowMovieService,
        { provide: MOVIES_REPOSITORY, useClass: InMemoryMoviesRepository },
      ],
    }).compile();

    inMemoryMoviesRepository =
      moduleRef.get<InMemoryMoviesRepository>(MOVIES_REPOSITORY);

    showMovieService = moduleRef.get<ShowMovieService>(ShowMovieService);

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

  it('should be able to return details of specific movie', async () => {
    const { id: directorId } = director;

    const { id } = await inMemoryMoviesRepository.create({
      name: 'Transforms',
      description:
        'It talks about two races of robots, the Autobots and the villainous Decepticons, arrive on Earth. Robots have the ability to transform into different mechanical objects',
      author: 'Elnora Austin',
      duration: '2h',
      year: 2010,
      genres: [genre],
      actors: [actor],
      directorId,
      votes: [],
    });

    const movie = await showMovieService.execute(id);

    expect(movie.name).toEqual('Transforms');
  });

  it('should return an not found exception if movie dont exists', async () => {
    await expect(
      showMovieService.execute('non-existing-user'),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
