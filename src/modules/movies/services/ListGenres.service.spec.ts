import { GENRES_REPOSITORY } from '@/config/constants/repositories.constants';
import { Test } from '@nestjs/testing';

import { InMemoryGenresRepository } from '../repositories/in-memory/InMemoryGenres.repository';
import { ListGenresService } from './ListGenres.service';

describe('ListGenresService', () => {
  let listGenresService: ListGenresService;
  let inMemoryGenresRepository: InMemoryGenresRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ListGenresService,
        {
          provide: GENRES_REPOSITORY,
          useClass: InMemoryGenresRepository,
        },
      ],
    }).compile();

    inMemoryGenresRepository =
      moduleRef.get<InMemoryGenresRepository>(GENRES_REPOSITORY);

    listGenresService = moduleRef.get<ListGenresService>(ListGenresService);

    await Promise.all([
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
  });

  it('should be able list all genres', async () => {
    const take = 1;
    const page = 1;
    const skip = 2;

    const genres = await listGenresService.execute({
      take,
      skip,
      page,
    });

    expect(genres.length).toBe(2);
  });
});
