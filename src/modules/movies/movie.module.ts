import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Actor } from '../casts/infra/typeorm/entities/Actor.entity';
import { Director } from '../casts/infra/typeorm/entities/Direction.entity';
import { ActorsRepository } from '../casts/infra/typeorm/repositories/Actors.repository';
import { DirectorsRepository } from '../casts/infra/typeorm/repositories/Directors.repository';
import { CreateGenresController } from './infra/http/controllers/CreateGenres.controller';
import { CreateMoviesController } from './infra/http/controllers/CreateMovies.controller';
import { CreateVoteController } from './infra/http/controllers/CreateVote.controller';
import { ListMoviesController } from './infra/http/controllers/ListMovies.controller';
import { ShowMoviesController } from './infra/http/controllers/ShowMovies.controller';
import { Genre } from './infra/typeorm/entities/Genre.entity';
import { Movie } from './infra/typeorm/entities/Movie.entity';
import { Vote } from './infra/typeorm/entities/Vote.entity';
import { GenresRepository } from './infra/typeorm/repositories/Genres.repository';
import { MoviesRepository } from './infra/typeorm/repositories/Movies.repository';
import { VotesRepository } from './infra/typeorm/repositories/Votes.repository';
import { CreateGenreService } from './services/CreateGenre.service';
import { CreateMovieService } from './services/CreateMovie.service';
import { CreateVotesToMoviesService } from './services/CreateVotesToMovies.service';
import { ListMoviesServices } from './services/ListMovies.service';
import { ShowMoviesServices } from './services/ShowMovies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Genre, Vote, Actor, Director])],
  controllers: [
    CreateGenresController,
    CreateMoviesController,
    ListMoviesController,
    ShowMoviesController,
    CreateVoteController,
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
    {
      provide: 'VOTE_REPOSITORY',
      useClass: VotesRepository,
    },
    {
      provide: 'DIRECTOR_REPOSITORY',
      useClass: DirectorsRepository,
    },
    {
      provide: 'ACTOR_REPOSITORY',
      useClass: ActorsRepository,
    },
    CreateGenreService,
    CreateMovieService,
    ListMoviesServices,
    ShowMoviesServices,
    CreateVotesToMoviesService,
  ],
})
export class MovieModule {}
