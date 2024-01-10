import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DiscordBotTokenDto } from '@badgebuddy/common';
import crypto from 'crypto';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
  ) {}

  generateToken(discordUserSId: string) {
    return this.jwtService.sign({
      sessionId: crypto.randomUUID().toString(),
      discordUserSId,
    } as DiscordBotTokenDto);
  }
}
