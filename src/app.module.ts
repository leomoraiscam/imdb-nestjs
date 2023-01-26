import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccessControlListModule } from './modules/accessControlList/acessControlList.module';
import { CastModule } from './modules/casts/cast.module';
import { MovieModule } from './modules/movies/movie.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5454,
      username: 'docker',
      password: 'docker',
      database: 'imdb',
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: false,
      synchronize: false,
    }),
    UsersModule,
    AccessControlListModule,
    MovieModule,
    CastModule,
  ],
})
export class AppModule {}
