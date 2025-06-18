import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CallLogService {
  constructor(private readonly httpService: HttpService) {}

  async retrieveCallLog(queryParams: any): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.get('https://api.convoso.com/v1/log/retrieve', {
        params: queryParams,
      })
    );
    return response.data;
  }
}