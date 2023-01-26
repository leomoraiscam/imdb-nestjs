import {
  MOVIES_REPOSITORY,
  GENRES_REPOSITORY,
  VOTES_REPOSITORY,
  DIRECTORS_REPOSITORY,
  ACTORS_REPOSITORY,
} from '@/config/constants/repositories.constants';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Actor } from '../casts/infra/typeorm/entities/Actor.entity';
import { Director } from '../casts/infra/typeorm/entities/Director.entity';
import { ActorsRepository } from '../casts/infra/typeorm/repositories/Actors.repository';
import { DirectorsRepository } from '../casts/infra/typeorm/repositories/Directors.repository';
import { CreateGenreController } from './infra/http/controllers/CreateGenre.controller';
import { CreateMovieController } from './infra/http/controllers/CreateMovie.controller';
import { CreateVoteController } from './infra/http/controllers/CreateVote.controller';
import { ListMoviesController } from './infra/http/controllers/ListMovies.controller';
import { ShowMovieController } from './infra/http/controllers/ShowMovie.controller';
import { UpdateMovieController } from './infra/http/controllers/UpdateMovie.controller';
import { Genre } from './infra/typeorm/entities/Genre.entity';
import { Movie } from './infra/typeorm/entities/Movie.entity';
import { Vote } from './infra/typeorm/entities/Vote.entity';
import { GenresRepository } from './infra/typeorm/repositories/Genres.repository';
import { MoviesRepository } from './infra/typeorm/repositories/Movies.repository';
import { VotesRepository } from './infra/typeorm/repositories/Votes.repository';
import { CreateGenreService } from './services/CreateGenre.service';
import { CreateMovieService } from './services/CreateMovie.service';
import { CreateVotesToMovieService } from './services/CreateVotesToMovie.service';
import { ListMoviesServices } from './services/ListMovies.service';
import { ShowMovieService } from './services/ShowMovie.service';
import { UpdateMovieService } from './services/UpdateMovie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Genre, Vote, Actor, Director])],
  controllers: [
    CreateMovieController,
    CreateGenreController,
    CreateVoteController,
    ListMoviesController,
    ShowMovieController,
    UpdateMovieController,
  ],
  providers: [
    {
      provide: MOVIES_REPOSITORY,
      useClass: MoviesRepository,
    },
    {
      provide: GENRES_REPOSITORY,
      useClass: GenresRepository,
    },
    {
      provide: VOTES_REPOSITORY,
      useClass: VotesRepository,
    },
    {
      provide: DIRECTORS_REPOSITORY,
      useClass: DirectorsRepository,
    },
    {
      provide: ACTORS_REPOSITORY,
      useClass: ActorsRepository,
    },
    CreateMovieService,
    CreateGenreService,
    CreateVotesToMovieService,
    ListMoviesServices,
    ShowMovieService,
    UpdateMovieService,
  ],
})
export class MovieModule {}
