import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { DependentService } from './dependent.service';
import { Dependent } from './schemas/dependent.schema';

@Controller()
export class DependentController {
  constructor(private readonly dependentService: DependentService) {}

  @Post()
  async createDependent(@Body() dependentData: any): Promise<Dependent> {
    return this.dependentService.createDependent(dependentData);
  }

  @Put(':id')
  async updateDependent(
    @Param('id') id: string,
    @Body() dependentData: any,
  ): Promise<Dependent | null> {
    return this.dependentService.updateDependent(id, dependentData);
  }

  @Get('customer/:customerId')
  async findDependentByCustomerId(@Param('customerId') customerId: string): Promise<Dependent[]> {
    return this.dependentService.findDependentByCustomerId(customerId);
  }
}