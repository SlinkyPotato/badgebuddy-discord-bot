import { Injectable, Logger, UseFilters } from '@nestjs/common';
import { Command, Handler, IA } from '@discord-nestjs/core';
import { SlashErrorExceptionFilter } from '@/filters/slash-error-exception.filter';
import { ChatInputCommandInteraction } from 'discord.js';

@Command({
  name: 'claim',
  description: 'Claim a POAP.',
})
@Injectable()
export class ClaimCommandService {
  constructor(private readonly logger: Logger) {}

  @Handler()
  @UseFilters(SlashErrorExceptionFilter)
  onClaimCommand(@IA() interaction: ChatInputCommandInteraction): any {
    const userId = interaction.member?.user.id;
    if (!userId) {
      throw new Error('User ID not found.');
    }
    const guildId = interaction.guildId;
    this.logger.log(
      `User ${userId} is attempting to claim a POAP in guild ${guildId}.`,
    );
    return {
      embeds: [
        {
          title: 'POAP Claimed (placeholder)',
          description: 'display poaps here as empirical message',
          color: 0x00ff00,
        },
      ],
    };
  }
}
