import { DIRECTORS_REPOSITORY } from '@/config/constants/repositories.constants';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { InMemoryDirectorsRepository } from '../repositories/in-memory/InMemoryDirectors.repositories';
import { DeleteDirectorService } from './DeleteDirector.service';

describe('DeleteDirectorService', () => {
  let deleteDirectorService: DeleteDirectorService;
  let inMemoryDirectorsRepository: InMemoryDirectorsRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DeleteDirectorService,
        {
          provide: DIRECTORS_REPOSITORY,
          useClass: InMemoryDirectorsRepository,
        },
      ],
    }).compile();

    inMemoryDirectorsRepository =
      moduleRef.get<InMemoryDirectorsRepository>(DIRECTORS_REPOSITORY);

    deleteDirectorService = moduleRef.get<DeleteDirectorService>(
      DeleteDirectorService,
    );
  });

  it('should be able delete a spefic existent director', async () => {
    const { id } = await inMemoryDirectorsRepository.create({
      name: 'Susie Richardson',
      gender: 'Female',
    });

    await deleteDirectorService.execute(id);

    const findDirector = await inMemoryDirectorsRepository.findById(id);

    expect(findDirector).toBeUndefined();
  });

  it('should not be able to delete a non-existing director', async () => {
    await expect(
      deleteDirectorService.execute('non-existing-director'),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
