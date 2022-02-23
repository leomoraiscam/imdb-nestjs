import { ConflictException } from '@nestjs/common';

import { InMemoryGenresRepository } from '../repositories/in-memory/InMemoryGenres.repository';
import { CreateGenreService } from './CreateGenre.service';

describe('Create Genres', () => {
  let createGenreService: CreateGenreService;
  let inMemoryGenresRepository: InMemoryGenresRepository;

  beforeEach(async () => {
    inMemoryGenresRepository = new InMemoryGenresRepository();
    createGenreService = new CreateGenreService(inMemoryGenresRepository);
  });

  it('should be able to create a genre', async () => {
    const genre = await createGenreService.execute({
      name: 'action',
      description: 'action genre',
    });

    expect(genre).toHaveProperty('id');
  });

  it('should not be able to create a role when the same exist', async () => {
    const genre = await inMemoryGenresRepository.create({
      name: 'adventure',
      description: 'adventure genre',
    });

    await expect(
      createGenreService.execute({
        name: genre.name,
        description: 'adventure genre',
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
