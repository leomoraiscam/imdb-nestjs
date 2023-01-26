import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { CheckApplicationStatusController } from './infra/http/controllers/CheckApplicationStatus.controller';
import { CheckApplicationStatusUseCase } from './services/CheckApplicationStatus.service';

@Module({
  imports: [TerminusModule],
  controllers: [CheckApplicationStatusController],
  providers: [CheckApplicationStatusUseCase],
})
export class HealthCheck {}
