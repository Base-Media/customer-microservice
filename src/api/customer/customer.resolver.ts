import { Resolver, Query, Args, ResolveReference, ResolveField, Parent } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { Customer, Office } from './customer.schema';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => Customer, { nullable: true })
  async getCustomer(@Args('_id') id: string): Promise<Customer | null> {
    console.log('Received ID:', id);

    if (!id) {
      console.error('No ID provided');
      throw new Error('Customer ID is required');
    }

    try {
      const customer = await this.customerService.findCustomerById(id);
      console.log('Fetched Customer:', customer);
      return customer;
    } catch (error) {
      console.error('Error in getCustomer resolver:', error);
      throw new Error('Failed to fetch customer');
    }
  }

  @Query(() => [Customer])
  async getAllCustomers(): Promise<Customer[]> {
    console.log('Fetching all customers');
    const customers = await this.customerService.findAllCustomers();
    console.log('Fetched customers:', customers);
    return customers;
  }

  @Query(() => [Customer])
  async searchCustomers(@Args('query') query: string): Promise<Customer[]> {
    return await this.customerService.searchCustomers(query);
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; _id: string }): Promise<Customer | null> {
    console.log('Resolving reference for customer:', reference);
    return await this.customerService.findCustomerById(reference._id);
  }

  @ResolveField(() => Office, { nullable: true })
  async office(@Parent() customer: Customer): Promise<Office | null> {
    if (!customer.officeId) {
      return null;
    }
    // Return a reference that the Office subgraph can resolve
    return { __typename: 'Office', id: customer.officeId.toString() } as Office;
  }
}