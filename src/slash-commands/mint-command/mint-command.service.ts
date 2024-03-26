import { Injectable, Logger, UseFilters, ValidationPipe } from '@nestjs/common';
import { Command, Handler, IA } from '@discord-nestjs/core';
import { SlashErrorExceptionFilter } from '@/filters/slash-error-exception.filter';
import { ChatInputCommandInteraction } from 'discord.js';
import { SlashCommandPipe } from '@discord-nestjs/common';
import { MintSlashDto } from '@/slash-commands/mint-command/dto/mint-slash.dto';

@Command({
  name: 'mint',
  description: 'Mint a POAP.',
})
@Injectable()
export class MintCommandService {
  constructor(private readonly logger: Logger) {}

  @Handler()
  @UseFilters(SlashErrorExceptionFilter)
  onMintCommand(
    @IA(SlashCommandPipe, ValidationPipe) slashRequest: MintSlashDto,
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
      `Minting POAPs with copies: ${slashRequest.copies} for user ${userId} in guild ${guildId}.`,
    );
    return {
      embeds: [
        {
          title: 'POAP Minted (placeholder)',
          description: 'Display success on mint here.',
          color: 0x00ff00,
        },
      ],
    };
  }
}
