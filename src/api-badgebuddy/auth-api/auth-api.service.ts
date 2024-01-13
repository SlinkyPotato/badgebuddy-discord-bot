import { Injectable } from '@nestjs/common';
import { InternalAxiosRequestConfig } from 'axios';
import { AuthRequestInterceptor } from '@/api-badgebuddy/auth-api/interceptors/auth-request/auth-request.interceptor';

@Injectable()
export class AuthApiService {
  constructor(
    private readonly authRequestInterceptor: AuthRequestInterceptor,
  ) {}

  commonAuthRequestInterceptor() {
    return {
      interceptor: (
        config: InternalAxiosRequestConfig<{ organizerSId: string }>,
      ) => {
        return this.authRequestInterceptor.intercept(config);
      },
    };
  }
}
