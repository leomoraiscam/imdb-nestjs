import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { InMemoryMoviesRepository } from '../repositories/in-memory/InMemoryMovies.repository';
import { ShowMoviesServices } from './ShowMovies.service';

describe('ShowMoviesService', () => {
  let service: ShowMoviesServices;
  let repository: InMemoryMoviesRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ShowMoviesServices,
        { provide: 'MOVIE_REPOSITORY', useClass: InMemoryMoviesRepository },
      ],
    }).compile();

    repository = moduleRef.get<InMemoryMoviesRepository>('MOVIE_REPOSITORY');

    service = moduleRef.get<ShowMoviesServices>(ShowMoviesServices);
  });

  describe('execute', () => {
    it('should return an movie from database', async () => {
      const movie = await repository.create({
        name: 'transformers',
        description: 'action genre',
        author: 'leo',
        duration: '1h30min',
        year: 2010,
        genres: [
          {
            id: '37b75d18-d4cf-499a-9129-b71f2c4abc76',
            name: 'aventura',
            description: 'this all movies of adventure',
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
      });

      expect(movie.name).toEqual('transformers');
    });

    it('should return an error if movie dont exists', async () => {
      await expect(service.execute('non-existing-user')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
});
