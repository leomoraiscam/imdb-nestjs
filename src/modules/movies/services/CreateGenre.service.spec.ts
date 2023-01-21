import { GENRES_REPOSITORY } from '@/config/constants/repositories.constants';
import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { InMemoryGenresRepository } from '../repositories/in-memory/InMemoryGenres.repository';
import { CreateGenreService } from './CreateGenre.service';

describe('CreateGenreService', () => {
  let createGenreService: CreateGenreService;
  let inMemoryGenresRepository: InMemoryGenresRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateGenreService,
        { provide: GENRES_REPOSITORY, useClass: InMemoryGenresRepository },
      ],
    }).compile();

    inMemoryGenresRepository =
      moduleRef.get<InMemoryGenresRepository>(GENRES_REPOSITORY);

    createGenreService = moduleRef.get<CreateGenreService>(CreateGenreService);
  });

  it('should be able to create a genre when receive correct data', async () => {
    const genre = await inMemoryGenresRepository.create({
      name: 'action and adventure',
      description:
        'This genre talks about characters who go through several adventures, as they are always fighting an enemy!',
    });

    expect(genre).toHaveProperty('id');
  });

  it('should not be able to create a genre when the same exist', async () => {
    const genre = await inMemoryGenresRepository.create({
      name: 'comedy',
      description: 'This genre is known for being light and fun.',
    });

    await expect(
      createGenreService.execute({
        name: genre.name,
        description: 'This genre is known for being light and fun.',
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
