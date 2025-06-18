import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { CustomerIdsService } from '../utils/customer-ids.service';

@Injectable()
export class CustomerIdsGuard implements CanActivate {
  constructor(private readonly customerIdsService: CustomerIdsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.userDetails;
    
    if (!user) {
      throw new BadRequestException('User details missing on request');
    }

    // Build filter based on role
    let filter: Record<string, any> = {};
    if (user.role === 'Admin' || user.role === 'Custo') {
      if (!user.officeId) {
        throw new BadRequestException('Office ID required for Admin role');
      }
      filter = { officeId: user.officeId };
    } else if (user.role === 'Agent') {
      filter = { userId: user._id };
    }

    try {
      // Fetch matching customer IDs from policy service
      const ids = await this.customerIdsService.fetchCustomerIds(filter);
      request.customerIds = ids;
      return true;
    } catch (error) {
      console.error('Error fetching customer IDs:', error);
      throw new BadRequestException('Failed to fetch customer IDs');
    }
  }
}