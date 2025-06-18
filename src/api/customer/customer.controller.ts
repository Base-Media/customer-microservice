import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query, 
  NotFoundException,
  UseGuards,
  Req
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './customer.schema';
import { UserDetailsGuard } from '../../guards/user-details.guard';
import { CustomerIdsGuard } from '../../guards/customer-ids.guard';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async createCustomer(@Body() customerData: any): Promise<Customer> {
    return this.customerService.createCustomer(customerData);
  }

  @Get('search')
  @UseGuards(UserDetailsGuard, CustomerIdsGuard)
  async search(@Query('q') q?: string, @Req() req?: any): Promise<Customer[]> {
    const ids = req.customerIds || [];
    console.log('Customer IDs:', ids);
    return this.customerService.findCustomersByIds(ids, q);
  }

  @Get('all-customers')
  async findAllCustomers(): Promise<Customer[]> {
    return this.customerService.findAllCustomers();
  }

  @Get(':id')
  async findCustomerById(@Param('id') id: string): Promise<Customer> {
    const customer = await this.customerService.findCustomerById(id);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return customer;
  }

  @Get()
  async searchCustomers(@Query('q') query: string): Promise<Customer[]> {
    console.log('Search route hit with query:', query);
    return this.customerService.searchCustomers(query);
  }

  @Put(':id')
  async updateCustomer(
    @Param('id') id: string,
    @Body() customerData: any,
  ): Promise<Customer> {
    const customer = await this.customerService.updateCustomer(id, customerData);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return customer;
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') id: string): Promise<{ message: string }> {
    const customer = await this.customerService.deleteCustomer(id);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return { message: 'Customer deleted successfully' };
  }
}