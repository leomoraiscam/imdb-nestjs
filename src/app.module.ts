import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccessControlListModule } from './modules/acessControlList/acessControlList.module';
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
  ],
})
export class AppModule {}
