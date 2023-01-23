import { MOVIES_REPOSITORY } from '@/config/constants/repositories.constants';
import { Actor } from '@/modules/casts/infra/typeorm/entities/Actor.entity';
import { Director } from '@/modules/casts/infra/typeorm/entities/Direction.entity';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';

import { InMemoryMoviesRepository } from '../repositories/in-memory/InMemoryMovies.repository';
import { DeleteMovieService } from './DeleteMovie.service';

describe('DeleteMovieService', () => {
  let deleteMovieService: DeleteMovieService;
  let inMemoryMoviesRepository: InMemoryMoviesRepository;
  let director: Director;
  let actor: Actor;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DeleteMovieService,
        { provide: MOVIES_REPOSITORY, useClass: InMemoryMoviesRepository },
      ],
    }).compile();

    inMemoryMoviesRepository =
      moduleRef.get<InMemoryMoviesRepository>(MOVIES_REPOSITORY);

    deleteMovieService = moduleRef.get<DeleteMovieService>(DeleteMovieService);

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
  });

  it('should be able delete a spefic existent movie', async () => {
    const { id: directorId } = director;

    const genre = {
      id: uuidv4(),
      name: 'comedy',
      description: 'This genre is known for being light and fun.',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const { id } = await inMemoryMoviesRepository.create({
      name: 'modern family',
      description:
        'With a hidden narration, the film offers an honest and often hilarious perspective on a familys daily life.',
      author: 'Mabel Palmer',
      duration: '1h30min',
      year: 2018,
      genres: [genre],
      actors: [actor],
      directorId: directorId,
    });

    await deleteMovieService.execute(id);

    const findMovie = await inMemoryMoviesRepository.findById(id);

    expect(findMovie).toBeUndefined();
  });

  it('should not be able to delete a non-existing movie', async () => {
    await expect(
      deleteMovieService.execute('non-existing-movie'),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
