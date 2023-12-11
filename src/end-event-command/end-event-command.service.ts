import { CommunityEventsManageApiService } from '@/api/community-events-manage/community-events-manage-api.service';
import { CommandExceptionFilter } from '@/command-validation.filter';
import { GuildOnlyGuard } from '@/guild-only-execution.guard';
import { SlashValidationFilter } from '@/slash-validation.filter';
import { SlashCommandPipe } from '@discord-nestjs/common';
import { Command, Handler, IA } from '@discord-nestjs/core';
import { Injectable, Logger, UseFilters, UseGuards, ValidationPipe } from '@nestjs/common';
import { EndEventSlashDto } from './dto/end-event-slash/end-event-slash.dto';
import { APIEmbed, ChatInputCommandInteraction, Colors } from 'discord.js';

@Command({
  name: 'end-event',
  description: 'End the community event.',
})
@Injectable()
export class EndEventCommandService {

  constructor(
    private readonly logger: Logger,
    private readonly eventsApiService: CommunityEventsManageApiService,
  ) {}

  @Handler()
  @UseFilters(SlashValidationFilter, CommandExceptionFilter)
  @UseGuards(GuildOnlyGuard)
  async onEndCommand(
    @IA(SlashCommandPipe, ValidationPipe) slashParams: EndEventSlashDto,
    @IA() interaction: ChatInputCommandInteraction,
  ) {
    this.logger.verbose(slashParams);
    
    const response = await this.eventsApiService.endEvent({
      guildSId: interaction.guildId?.toString() as string,
      voiceChannelSId: slashParams.voiceChannelId,
      organizerSId
    })

    return 'Event ended!';
  }

  private getEndEventMsg (
    title: string,
    userTag: string,
    guildName: string,
    voiceChannelName: string,
    durationInMinutes: number,
  ): APIEmbed {
    return {
      title: 'Community Event Ended',
      color: Colors.DarkRed,
      description: 'Event has ended.',
      fields: [
        { name: 'Event', value: `${ServiceUtils.prepEmbedField(poapEvent.eventName)}`, inline: true },
        { name: 'Organizer', value: `${guildMember.user.tag} `, inline: true },
        { name: 'Discord Server', value: `${guildMember.guild.name} `, inline: true },
        { name: 'Platform', value: `${Platforms.PLATFORM_TYPE_DISCORD}`, inline: false },
        { name: 'Voice Channel', value: `🎙${poapEvent.discordEventMetadata?.voiceChannelName} `, inline: true },
        { name: 'Duration', value: `${ServiceUtils.calculateDurationFromDates(poapEvent.endTime, poapEvent.startTime)} minutes`, inline: true },
      ],
    };
  }
}
