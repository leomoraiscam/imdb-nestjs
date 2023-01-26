import { HEALTH_CHECK } from '@/config/constants/resourceTags.constants';
import { CheckApplicationStatusUseCase } from '@/modules/healthCheck/services/CheckApplicationStatus.service';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags(HEALTH_CHECK)
@Controller()
@SkipThrottle()
export class CheckApplicationStatusController {
  constructor(
    private readonly checkApplicationStatusUseCase: CheckApplicationStatusUseCase,
  ) {}

  @Get()
  @HealthCheck()
  get(): Promise<HealthCheckResult> {
    return this.checkApplicationStatusUseCase.execute();
  }
}
