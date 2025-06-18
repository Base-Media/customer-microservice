import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { SpouseService } from './spouse.service';
import { Spouse } from './schemas/spouse.schema';

@Controller()
export class SpouseController {
  constructor(private readonly spouseService: SpouseService) {}

  @Post()
  async createSpouse(@Body() spouseData: any): Promise<Spouse> {
    return this.spouseService.createSpouse(spouseData);
  }

  @Put(':id')
  async updateSpouse(
    @Param('id') id: string,
    @Body() spouseData: any,
  ): Promise<Spouse | null> {
    return this.spouseService.updateSpouse(id, spouseData);
  }

  @Get('customer/:customerId')
  async findSpouseByCustomerId(@Param('customerId') customerId: string): Promise<Spouse | null> {
    const spouse = await this.spouseService.findSpouseByCustomerId(customerId);
    console.log('heres the spouse:', spouse);
    return spouse;
  }
}