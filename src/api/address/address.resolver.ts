import { Resolver, Query, Args, ResolveReference } from '@nestjs/graphql';
import { AddressService } from './address.service';
import { CustomerAddress } from './schemas/address.schema';

@Resolver(() => CustomerAddress)
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  @Query(() => CustomerAddress, { nullable: true })
  async getAddressByCustomerId(@Args('customerId') customerId: string): Promise<CustomerAddress | null> {
    return await this.addressService.findAddressByCustomerId(customerId);
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; _id: string }): Promise<CustomerAddress | null> {
    console.log('Resolving reference for customer address:', reference);
    return await this.addressService.findAddressById(reference._id);
  }
}