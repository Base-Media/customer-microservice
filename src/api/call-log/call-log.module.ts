import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CallLogController } from './call-log.controller';
import { CallLogService } from './call-log.service';

@Module({
  imports: [HttpModule],
  controllers: [CallLogController],
  providers: [CallLogService],
  exports: [CallLogService],
})
export class CallLogModule {}