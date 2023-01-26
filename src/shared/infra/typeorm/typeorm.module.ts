import { ormConfig } from '@/config/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: ormConfig,
      inject: [ConfigService],
    }),
  ],
})
export class PostgresProviderModule {}
