import { Resolver, Query, Args } from '@nestjs/graphql';
import { AddressService } from './address.service';
import { Address } from './schemas/address.schema';

@Resolver(() => Address)
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  @Query(() => Address, { nullable: true })
  async getAddressByCustomerId(@Args('customerId') customerId: string): Promise<Address | null> {
    return await this.addressService.findAddressByCustomerId(customerId);
  }
}