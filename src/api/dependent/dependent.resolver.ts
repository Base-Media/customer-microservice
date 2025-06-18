import { Resolver, Query, Args } from '@nestjs/graphql';
import { DependentService } from './dependent.service';
import { Dependent } from './schemas/dependent.schema';

@Resolver(() => Dependent)
export class DependentResolver {
  constructor(private readonly dependentService: DependentService) {}

  @Query(() => [Dependent])
  async getDependentByCustomerId(@Args('customerId') customerId: string): Promise<Dependent[]> {
    return await this.dependentService.findDependentByCustomerId(customerId);
  }
}