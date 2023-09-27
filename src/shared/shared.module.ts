import { Module } from '@nestjs/common';

import { TimeService } from './services/time.service';

@Module({
  providers: [TimeService],
  exports: [TimeService]
})
export class SharedModule {}
