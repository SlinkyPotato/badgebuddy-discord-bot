import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { SetupCommand } from './setup.command';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { GuildServerGuard } from './guards/guild-server.guard';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_GUARD, useClass: GuildServerGuard },
    SetupCommand,
  ],
})
export class SetupModule {}
