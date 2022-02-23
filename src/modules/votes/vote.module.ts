import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Movie } from '../movies/infra/typeorm/entities/Movie.entity';
import { MoviesRepository } from '../movies/infra/typeorm/repositories/Movies.repository';
import { CreateVoteController } from './infra/http/controllers/CreateVote.controller';
import { Vote } from './infra/typeorm/entities/Vote.entity';
import { VotesRepository } from './infra/typeorm/repositories/Votes.repository';
import { CreateVotesToMoviesService } from './services/CreateVotesToMovies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vote, Movie])],
  controllers: [CreateVoteController],
  providers: [
    {
      provide: 'MOVIE_REPOSITORY',
      useClass: MoviesRepository,
    },
    {
      provide: 'VOTE_REPOSITORY',
      useClass: VotesRepository,
    },
    CreateVotesToMoviesService,
  ],
})
export class VoteModule {}
