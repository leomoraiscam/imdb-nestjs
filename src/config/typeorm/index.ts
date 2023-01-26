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
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USER'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
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
