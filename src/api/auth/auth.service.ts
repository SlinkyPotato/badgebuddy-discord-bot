import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DiscordBotTokenDto } from '@badgebuddy/common';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async generateToken(discordUserSId: string) {
    return this.jwtService.sign({
      discordUserSId,
    } as DiscordBotTokenDto);
  }
}
