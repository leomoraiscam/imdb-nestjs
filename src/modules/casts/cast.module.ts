import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateActorsController } from './infra/http/controllers/CreateActor.controller';
import { CreateDirectorsController } from './infra/http/controllers/CreateDirector.controller';
import { Actor } from './infra/typeorm/entities/Actor.entity';
import { Director } from './infra/typeorm/entities/Direction.entity';
import { ActorsRepository } from './infra/typeorm/repositories/Actors.repository';
import { DirectorsRepository } from './infra/typeorm/repositories/Directors.repository';
import { CreateActorService } from './services/CreateActor.service';
import { CreateDirectorService } from './services/CreateDirector.service';

@Module({
  imports: [TypeOrmModule.forFeature([Director, Actor])],
  controllers: [CreateActorsController, CreateDirectorsController],
  providers: [
    {
      provide: 'DIRECTOR_REPOSITORY',
      useClass: DirectorsRepository,
    },
    {
      provide: 'ACTOR_REPOSITORY',
      useClass: ActorsRepository,
    },
    CreateActorService,
    CreateDirectorService,
  ],
})
export class CastModule {}
