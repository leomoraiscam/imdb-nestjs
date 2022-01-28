import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot()],
})
export class AppModule {}
