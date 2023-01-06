import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Actor } from './infra/typeorm/entities/Actor.entity';
import { Director } from './infra/typeorm/entities/Direction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Director, Actor])],
})
export class CastModule {}
