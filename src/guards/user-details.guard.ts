import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserDetailsGuard implements CanActivate {
  private readonly authUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.authUrl = this.configService.get<string>('AUTH_URL');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header required');
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.authUrl}/auth/me`, {
          headers: { Authorization: authHeader },
        })
      );
      request.userDetails = response.data;
      console.log('User details retrieved:', request.userDetails);
      return true;
    } catch (error: any) {
      console.error('Error retrieving user details from auth service:', error.message);
      throw new UnauthorizedException('Failed to retrieve user details');
    }
  }
}