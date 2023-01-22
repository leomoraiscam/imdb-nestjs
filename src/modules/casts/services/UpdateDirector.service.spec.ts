import { DIRECTORS_REPOSITORY } from '@/config/constants/repositories.constants';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { InMemoryDirectorsRepository } from '../repositories/in-memory/InMemoryDirectors.repositories';
import { UpdateDirectorService } from './UpdateDirector.service';

describe('UpdateDirectorService', () => {
  let updateDirectorService: UpdateDirectorService;
  let inMemoryDirectorsRepository: InMemoryDirectorsRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdateDirectorService,
        {
          provide: DIRECTORS_REPOSITORY,
          useClass: InMemoryDirectorsRepository,
        },
      ],
    }).compile();

    inMemoryDirectorsRepository =
      moduleRef.get<InMemoryDirectorsRepository>(DIRECTORS_REPOSITORY);

    updateDirectorService = moduleRef.get<UpdateDirectorService>(
      UpdateDirectorService,
    );
  });

  it('should be able update an director when receive correct data', async () => {
    const [firstDirector] = await Promise.all([
      inMemoryDirectorsRepository.create({
        name: 'Chester Hale',
        gender: 'Male',
      }),
      inMemoryDirectorsRepository.create({
        name: 'Claudia Armstrong',
        gender: 'Female',
      }),
      inMemoryDirectorsRepository.create({
        name: 'Kathryn Peterson',
        gender: 'Female',
      }),
    ]);

    const { id } = firstDirector;

    const actorUpdated = await updateDirectorService.execute({
      directorId: id,
      name: 'John doe',
      gender: 'Male',
    });

    expect(actorUpdated.name).toEqual('John doe');
  });

  it('should not be able update an director when the same does not exist', async () => {
    await expect(
      updateDirectorService.execute({
        directorId: 'non-exist-director',
        gender: 'Male',
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should not be able update an director when name already exist', async () => {
    const [firstDirector, secondDirector] = await Promise.all([
      inMemoryDirectorsRepository.create({
        name: 'Glen Henderson',
        gender: 'Male',
      }),
      inMemoryDirectorsRepository.create({
        name: 'Rebecca Francis',
        gender: 'Female',
      }),
      inMemoryDirectorsRepository.create({
        name: 'Amelia Ingram',
        gender: 'Female',
      }),
    ]);

    await expect(
      updateDirectorService.execute({
        directorId: firstDirector.id,
        name: secondDirector.name,
        gender: 'Female',
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
