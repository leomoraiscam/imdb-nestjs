import { GENRES_REPOSITORY } from '@/config/constants/repositories.constants';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { InMemoryGenresRepository } from '../repositories/in-memory/InMemoryGenres.repository';
import { UpdateGenreService } from './UpdateGenre.service';

describe('UpdateGenreService', () => {
  let updateGenreService: UpdateGenreService;
  let inMemoryGenresRepository: InMemoryGenresRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdateGenreService,
        { provide: GENRES_REPOSITORY, useClass: InMemoryGenresRepository },
      ],
    }).compile();

    inMemoryGenresRepository =
      moduleRef.get<InMemoryGenresRepository>(GENRES_REPOSITORY);

    updateGenreService = moduleRef.get<UpdateGenreService>(UpdateGenreService);
  });

  it('should be able update an genre when receive correct data', async () => {
    const [firstGenre] = await Promise.all([
      inMemoryGenresRepository.create({
        name: 'action and adventure',
        description: 'adventure',
      }),
      inMemoryGenresRepository.create({
        name: 'sci-fy',
        description:
          'Science fiction is a genre of speculative fiction, which usually deals with fictional and imaginative concepts.',
      }),
      inMemoryGenresRepository.create({
        name: 'comedy',
        description: 'This genre is known for being light and fun.',
      }),
    ]);

    const genreUpdated = await updateGenreService.execute({
      genreId: firstGenre.id,
      name: firstGenre.name,
      description:
        'This genre talks about characters who go through several adventures, as they are always fighting an enemy!',
    });

    expect(genreUpdated.description).toEqual(genreUpdated.description);
  });

  it('should not be able update an genre when the same does not exist', async () => {
    await expect(
      updateGenreService.execute({
        genreId: 'non-exist-genre',
        name: 'action and adventure',
        description:
          'This genre talks about characters who go through several adventures, as they are always fighting an enemy!',
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should not be able update an genre when name already exist', async () => {
    const [firstGenre, secondGenre] = await Promise.all([
      inMemoryGenresRepository.create({
        name: 'action and adventure',
        description:
          'This genre talks about characters who go through several adventures, as they are always fighting an enemy!',
      }),
      inMemoryGenresRepository.create({
        name: 'sci-fy',
        description:
          'Science fiction is a genre of speculative fiction, which usually deals with fictional and imaginative concepts.',
      }),
      inMemoryGenresRepository.create({
        name: 'comedy',
        description: 'This genre is known for being light and fun.',
      }),
    ]);

    await expect(
      updateGenreService.execute({
        genreId: firstGenre.id,
        name: secondGenre.name,
        description:
          'Science fiction is a genre of speculative fiction, which usually deals with fictional and imaginative concepts.',
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
