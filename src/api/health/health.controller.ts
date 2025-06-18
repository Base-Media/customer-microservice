import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getHealth() {
    console.log('customer service is Healthy');
    return { status: 'customer service is Healthy' };
  }
}