import { Controller, Get, Query, Res } from '@nestjs/common';
import { CallLogService } from './call-log.service';
import { Response } from 'express';

@Controller()
export class CallLogController {
  constructor(private readonly callLogService: CallLogService) {}

  @Get('retrieve')
  async retrieveCallLog(@Query() query: any, @Res() res: Response): Promise<void> {
    try {
      const data = await this.callLogService.retrieveCallLog(query);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching data from API.' });
    }
  }
}