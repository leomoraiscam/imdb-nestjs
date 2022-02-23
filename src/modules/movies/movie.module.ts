import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateGenresController } from './infra/http/controllers/CreateGenres.controller';
import { CreateMoviesController } from './infra/http/controllers/CreateMovies.controller';
import { ListMoviesController } from './infra/http/controllers/ListMovies.controller';
import { ShowMoviesController } from './infra/http/controllers/ShowMovies.controller';
import { Genre } from './infra/typeorm/entities/Genre.entity';
import { Movie } from './infra/typeorm/entities/Movie.entity';
import { GenresRepository } from './infra/typeorm/repositories/Genres.repository';
import { MoviesRepository } from './infra/typeorm/repositories/Movies.repository';
import { CreateGenreService } from './services/CreateGenre.service';
import { CreateMovieService } from './services/CreateMovie.service';
import { ListMoviesServices } from './services/ListMovies.service';
import { ShowMoviesServices } from './services/ShowMovies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Genre])],
  controllers: [
    CreateGenresController,
    CreateMoviesController,
    ListMoviesController,
    ShowMoviesController,
  ],
  providers: [
    {
      provide: 'GENRE_REPOSITORY',
      useClass: GenresRepository,
    },
    {
      provide: 'MOVIE_REPOSITORY',
      useClass: MoviesRepository,
    },
    CreateGenreService,
    CreateMovieService,
    ListMoviesServices,
    ShowMoviesServices,
  ],
})
export class MovieModule {}
