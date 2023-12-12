import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthRequestInterceptor } from './auth-request.interceptor';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      secret: process.env.BB_DISCORD_BOT_CLIENT_SECRET,
      signOptions: {
        expiresIn: '4s',
        issuer: process.env.BB_DISCORD_BOT_CLIENT_ID,
        subject: process.env.BB_DISCORD_BOT_CLIENT_ID,
      },
    }),
  ],
  providers: [
    AuthService,
    AuthRequestInterceptor,
  ],
  exports: [
    AuthService,
    AuthRequestInterceptor,
  ],
})
export class AuthModule {}
