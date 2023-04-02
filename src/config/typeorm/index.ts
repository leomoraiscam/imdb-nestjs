import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface IConfigEnvironment {
  local?: TypeOrmModuleOptions;
  development?: TypeOrmModuleOptions;
}

export const ormConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const environment = configService.get<string>('node_env', 'local');

  const environments: IConfigEnvironment = {
    local: {
      host: 'localhost',
      port: 5454,
      username: 'docker',
      password: 'docker',
      database: 'imdb',
      autoLoadEntities: true,
      entities: [`${__dirname}/dist/**/*.entity{.ts,.js}`],
    },
  };
  const config = environments[environment];

  return {
    type: 'postgres',
    ...config,
  };
};
