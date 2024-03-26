import { Injectable, Logger, UseFilters, ValidationPipe } from '@nestjs/common';
import { Command, Handler, IA } from '@discord-nestjs/core';
import { SlashErrorExceptionFilter } from '@/filters/slash-error-exception.filter';
import { ChatInputCommandInteraction } from 'discord.js';
import { SlashCommandPipe } from '@discord-nestjs/common';
import { DistributeSlashDto } from '@/slash-commands/distribute-command/dto/distribute-slash.dto';

@Command({
  name: 'distribute',
  description: 'Distribute POAPs to users.',
})
@Injectable()
export class DistributeCommandService {
  constructor(private readonly logger: Logger) {}

  @Handler()
  @UseFilters(SlashErrorExceptionFilter)
  onDistributeCommand(
    @IA(SlashCommandPipe, ValidationPipe) slashRequest: DistributeSlashDto,
    @IA() interaction: ChatInputCommandInteraction,
  ): any {
    const userId = interaction.member?.user.id;
    if (!userId) {
      throw new Error('User ID not found.');
    }
    const guildId = interaction.guildId;
    if (!guildId) {
      throw new Error('Guild ID not found.');
    }
    this.logger.log(
      `Distributing POAPs to users for communityEventId: ${slashRequest.communityEventId}.`,
    );
    return {
      embeds: [
        {
          title: 'POAPs distributed (placeholder)',
          description: 'Display success on distribution here.',
          color: 0x00ff00,
        },
      ],
    };
  }
}
