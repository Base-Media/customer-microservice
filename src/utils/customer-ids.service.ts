import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CustomerIdsService {
  private readonly policyUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.policyUrl = this.configService.get<string>('POLICY_URL');
    if (!this.policyUrl) {
      throw new Error('POLICY_URL environment variable is not defined');
    }
  }

  async fetchCustomerIds(filter: Record<string, any> = {}): Promise<string[]> {
    console.log('Fetching customer IDs with filter:', filter);
    try {
      const response = await firstValueFrom(
        this.httpService.post<string[]>(`${this.policyUrl}/policy-search/customer-ids`, filter)
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching customer IDs from policy service:', error);
      throw error;
    }
  }
}