import { Injectable } from '@nestjs/common';
import {
  HealthCheckResult,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class CheckApplicationStatusUseCase {
  constructor(
    private health: HealthCheckService,
    private postgres: TypeOrmHealthIndicator,
  ) {}

  async execute(): Promise<HealthCheckResult> {
    return this.health.check([() => this.postgres.pingCheck('database')]);
  }
}
