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

  it('should be able list all genres with default pagination values', async () => {
    const genres = await listGenresService.execute({});

    expect(genres.length).toBe(3);
  });

  it('should be able list genres with custom pagination values', async () => {
    const page = 1;
    const perPage = 2;

    const genres = await listGenresService.execute({
      perPage,
      page,
    });

    expect(genres.length).toBe(2);
  });

  it('should be able list genres in second page with two objects', async () => {
    const page = 2;
    const perPage = 1;

    const genres = await listGenresService.execute({
      perPage,
      page,
    });

    expect(genres.length).toBe(1);
  });

  it('should be able list genres in second page with insufficient objects', async () => {
    const page = 2;
    const perPage = 10;

    const genres = await listGenresService.execute({
      perPage,
      page,
    });

    expect(genres.length).toBe(0);
  });

  it('should be able list genres with default pagination and filter by name', async () => {
    const genres = await listGenresService.execute({
      keyword: 'sci-fy',
    });

    expect(genres.length).toBe(1);
  });

  it.only('should be able list genres with custom pagination and filter by name', async () => {
    const keyword = 'sci-fy';
    const page = 3;
    const perPage = 8;

    const genres = await listGenresService.execute({
      keyword,
      page,
      perPage,
    });

    expect(genres.length).toBe(0);
  });
});
