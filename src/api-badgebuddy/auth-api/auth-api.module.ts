import { Logger, Module } from '@nestjs/common';
import { AuthApiService } from './auth-api.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthResponseInterceptor } from './interceptors/auth-response/auth-response.interceptor';
import {
  ENV_BADGEBUDDY_API_CLIENT_ID,
  ENV_BADGEBUDDY_API_CLIENT_SECRET,
} from '@/app.constants';
import { OrganizerSIdRequestInterceptor } from '@/api-badgebuddy/auth-api/interceptors/organizer-sid-request/organizer-sid-request.interceptor';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(ENV_BADGEBUDDY_API_CLIENT_SECRET),
        signOptions: {
          expiresIn: '4s',
          issuer: configService.get<string>(ENV_BADGEBUDDY_API_CLIENT_ID),
          subject: configService.get<string>(ENV_BADGEBUDDY_API_CLIENT_ID),
        },
      }),
    }),
  ],
  providers: [
    Logger,
    AuthApiService,
    OrganizerSIdRequestInterceptor,
    AuthResponseInterceptor,
  ],
  exports: [AuthApiService],
})
export class AuthApiModule {}
