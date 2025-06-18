import { Resolver, Query, Args } from '@nestjs/graphql';
import { SpouseService } from './spouse.service';
import { Spouse } from './schemas/spouse.schema';

@Resolver(() => Spouse)
export class SpouseResolver {
  constructor(private readonly spouseService: SpouseService) {}

  @Query(() => Spouse, { nullable: true })
  async getSpouseByCustomerId(@Args('customerId') customerId: string): Promise<Spouse | null> {
    return await this.spouseService.findSpouseByCustomerId(customerId);
  }
}