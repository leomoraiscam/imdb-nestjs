import { Module } from '@nestjs/common';

import { BCryptHashProvider } from './implementations/BCryptHash.provider';

@Module({
  providers: [BCryptHashProvider],
  exports: [BCryptHashProvider],
})
export class HashProviderModule {}
