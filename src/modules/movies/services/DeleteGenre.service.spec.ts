import { GENRES_REPOSITORY } from '@/config/constants/repositories.constants';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { InMemoryGenresRepository } from '../repositories/in-memory/InMemoryGenres.repository';
import { DeleteGenreService } from './DeleteGenres.service';

describe('DeleteGenreService', () => {
  let deleteGenreService: DeleteGenreService;
  let inMemoryGenresRepository: InMemoryGenresRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DeleteGenreService,
        { provide: GENRES_REPOSITORY, useClass: InMemoryGenresRepository },
      ],
    }).compile();

    inMemoryGenresRepository =
      moduleRef.get<InMemoryGenresRepository>(GENRES_REPOSITORY);

    deleteGenreService = moduleRef.get<DeleteGenreService>(DeleteGenreService);
  });

  it('should be able delete a spefic existent genre', async () => {
    const { id } = await inMemoryGenresRepository.create({
      name: 'action and adventure',
      description:
        'This genre talks about characters who go through several adventures, as they are always fighting an enemy!',
    });

    await deleteGenreService.execute(id);

    const findGenre = await inMemoryGenresRepository.findById(id);

    expect(findGenre).toBeUndefined();
  });

  it('should not be able to delete a non-existing author', async () => {
    await expect(
      deleteGenreService.execute('non-existing-genre'),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
