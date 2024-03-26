import { Injectable } from '@nestjs/common';
import { InternalAxiosRequestConfig } from 'axios';
import { OrganizerSIdRequestInterceptor } from '@/api-badgebuddy/auth-api/interceptors/organizer-sid-request/organizer-sid-request.interceptor';

@Injectable()
export class AuthApiService {
  constructor(
    private readonly organizerSIdRequestInterceptor: OrganizerSIdRequestInterceptor,
  ) {}

  organizerRequestInterceptor() {
    return {
      interceptor: (
        config: InternalAxiosRequestConfig<{ organizerSId: string }>,
      ) => {
        return this.organizerSIdRequestInterceptor.intercept(config);
      },
    };
  }
}
