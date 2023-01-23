import {
  ACTORS_REPOSITORY,
  DIRECTORS_REPOSITORY,
} from '@/config/constants/repositories.constants';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateActorController } from './infra/http/controllers/CreateActor.controller';
import { CreateDirectorController } from './infra/http/controllers/CreateDirector.controller';
import { ListActorsController } from './infra/http/controllers/ListActors.controller';
import { ListDirectorsController } from './infra/http/controllers/ListDirectors.controller';
import { UpdateActorController } from './infra/http/controllers/UpdateActor.controller';
import { UpdateDirectorController } from './infra/http/controllers/UpdateDirector.controller';
import { Actor } from './infra/typeorm/entities/Actor.entity';
import { Director } from './infra/typeorm/entities/Direction.entity';
import { ActorsRepository } from './infra/typeorm/repositories/Actors.repository';
import { DirectorsRepository } from './infra/typeorm/repositories/Directors.repository';
import { CreateActorService } from './services/CreateActor.service';
import { CreateDirectorService } from './services/CreateDirector.service';
import { ListActorsServices } from './services/ListActors.service';
import { ListDirectorsServices } from './services/ListDirectors.service';
import { UpdateActorService } from './services/UpdateActor.service';
import { UpdateDirectorService } from './services/UpdateDirector.service';

@Module({
  imports: [TypeOrmModule.forFeature([Director, Actor])],
  controllers: [
    CreateDirectorController,
    CreateActorController,
    ListDirectorsController,
    ListActorsController,
    UpdateDirectorController,
    UpdateActorController,
  ],
  providers: [
    {
      provide: DIRECTORS_REPOSITORY,
      useClass: DirectorsRepository,
    },
    {
      provide: ACTORS_REPOSITORY,
      useClass: ActorsRepository,
    },
    CreateDirectorService,
    CreateActorService,
    ListActorsServices,
    ListDirectorsServices,
    UpdateDirectorService,
    UpdateActorService,
  ],
})
export class CastModule {}
