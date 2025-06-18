import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from './schemas/address.schema';

@Controller()
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async createAddress(@Body() addressData: any): Promise<Address> {
    return this.addressService.createAddress(addressData);
  }

  @Put(':id')
  async updateAddress(
    @Param('id') id: string,
    @Body() addressData: any,
  ): Promise<Address | null> {
    return this.addressService.updateAddress(id, addressData);
  }

  @Get('customer/:customerId')
  async findAddressByCustomerId(@Param('customerId') customerId: string): Promise<Address | null> {
    return this.addressService.findAddressByCustomerId(customerId);
  }
}