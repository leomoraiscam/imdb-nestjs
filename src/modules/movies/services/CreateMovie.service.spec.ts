import { ConflictException } from '@nestjs/common';

import { InMemoryGenresRepository } from '../repositories/in-memory/InMemoryGenres.repository';
import { InMemoryMoviesRepository } from '../repositories/in-memory/InMemoryMovies.repository';
import { CreateMovieService } from './CreateMovie.service';

describe('Create Movie', () => {
  let createMovieService: CreateMovieService;
  let inMemoryMoviesRepository: InMemoryMoviesRepository;
  let inMemoryGenresRepository: InMemoryGenresRepository;

  beforeEach(async () => {
    inMemoryMoviesRepository = new InMemoryMoviesRepository();
    inMemoryGenresRepository = new InMemoryGenresRepository();
    createMovieService = new CreateMovieService(
      inMemoryMoviesRepository,
      inMemoryGenresRepository,
    );
  });

  it('should be able to create a movie', async () => {
    const genre1 = await inMemoryGenresRepository.create({
      name: 'action',
      description: 'action desc',
    });

    const genre2 = await inMemoryGenresRepository.create({
      name: 'adventure',
      description: 'adventure desc',
    });

    const movie = await createMovieService.execute({
      name: 'action',
      description: 'action genre',
      author: 'leo',
      duration: '1h30min',
      year: 2010,
      genre_ids: [genre1.id, genre2.id],
    });

    expect(movie).toHaveProperty('id');
  });

  it('should not be able to create a role when the same exist', async () => {
    const genre1 = await inMemoryGenresRepository.create({
      name: 'action',
      description: 'action desc',
    });

    const genre2 = await inMemoryGenresRepository.create({
      name: 'adventure',
      description: 'adventure desc',
    });

    const movie = await inMemoryMoviesRepository.create({
      name: 'action',
      description: 'action genre',
      author: 'leo',
      duration: '1h30min',
      year: 2010,
      genres: [genre1, genre2],
    });

    await expect(
      createMovieService.execute({
        name: movie.name,
        description: 'action genre',
        author: 'leo',
        duration: '1h30min',
        year: 2010,
        genre_ids: [genre1.id, genre2.id],
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
