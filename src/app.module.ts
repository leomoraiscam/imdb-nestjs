import { PostgresProviderModule } from '@/shared/infra/typeorm/typeorm.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AccessControlListModule } from './modules/accessControlList/acessControlList.module';
import { CastModule } from './modules/casts/cast.module';
import { MovieModule } from './modules/movies/movie.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostgresProviderModule,
    UsersModule,
    AccessControlListModule,
    MovieModule,
    CastModule,
  ],
})
export class AppModule {}
