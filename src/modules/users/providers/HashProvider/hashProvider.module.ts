import { Module } from '@nestjs/common';

import { BCryptHashProvider } from './implementations/BCryptHashProvider.service';

@Module({
  providers: [BCryptHashProvider],
  exports: [BCryptHashProvider],
})
export class HashProviderModule {}
