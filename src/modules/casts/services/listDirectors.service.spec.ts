import { DIRECTORS_REPOSITORY } from '@/config/constants/repositories.constants';
import { Test } from '@nestjs/testing';

import { InMemoryDirectorsRepository } from '../repositories/in-memory/InMemoryDirectors.repositories';
import { ListDirectorsServices } from './ListDirectors.service';

describe('ListDirectorsService', () => {
  let listDirectorsServices: ListDirectorsServices;
  let inMemoryDirectorsRepository: InMemoryDirectorsRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ListDirectorsServices,
        {
          provide: DIRECTORS_REPOSITORY,
          useClass: InMemoryDirectorsRepository,
        },
      ],
    }).compile();

    inMemoryDirectorsRepository =
      moduleRef.get<InMemoryDirectorsRepository>(DIRECTORS_REPOSITORY);

    listDirectorsServices = moduleRef.get<ListDirectorsServices>(
      ListDirectorsServices,
    );

    await Promise.all([
      inMemoryDirectorsRepository.create({
        name: 'Glen Henderson',
        gender: 'Female',
      }),
      inMemoryDirectorsRepository.create({
        name: 'Franklin Chandler',
        gender: 'Male',
      }),
      inMemoryDirectorsRepository.create({
        name: 'Maggie Henderson',
        gender: 'Female',
      }),
    ]);
  });

  it('should be able list all directors with default pagination values', async () => {
    const directors = await listDirectorsServices.execute({});

    expect(directors.length).toBe(3);
  });

  it('should be able list directors with custom pagination values', async () => {
    const page = 1;
    const perPage = 2;

    const directors = await listDirectorsServices.execute({
      perPage,
      page,
    });

    expect(directors.length).toBe(2);
  });

  it('should be able list directors in second page with two objects', async () => {
    const page = 2;
    const perPage = 1;

    const directors = await listDirectorsServices.execute({
      perPage,
      page,
    });

    expect(directors.length).toBe(1);
  });

  it('should be able list directors in second page with insufficient objects', async () => {
    const page = 2;
    const perPage = 10;

    const directors = await listDirectorsServices.execute({
      perPage,
      page,
    });

    expect(directors.length).toBe(0);
  });

  it('should be able list directors with default pagination and filter by name', async () => {
    const directors = await listDirectorsServices.execute({
      name: 'Henderson',
    });

    expect(directors.length).toBe(1);
  });

  it('should be able list directors with custom pagination and filter by name', async () => {
    const keyword = 'Henderson';
    const page = 3;
    const perPage = 8;

    const directors = await listDirectorsServices.execute({
      keyword,
      page,
      perPage,
    });

    expect(directors.length).toBe(0);
  });
});
