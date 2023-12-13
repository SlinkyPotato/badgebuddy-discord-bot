import { GuildOnlyGuard as GuildOnlyGuard } from '@/guards/guild-only-execution.guard';
import { SlashValidationFilter } from '@/filters/slash-validation.filter';
import { SlashCommandPipe } from '@discord-nestjs/common';
import { Command, Handler, IA } from '@discord-nestjs/core';
import { Injectable, Logger, UseFilters, UseGuards, ValidationPipe } from '@nestjs/common';
import { APIEmbed, ChatInputCommandInteraction, Colors, GuildMember, InteractionReplyOptions } from 'discord.js';
import { StartEventSlashDto } from './dto/start-event-slash.dto';
import {
  CommunityEventsManageApiService
} from '@/api/community-events-manage/community-events-manage-api.service';
import { SlashExceptionFilter } from '@/filters/slash-exception.filter';
import { SlashException } from '@/exceptions/slash.exception';

@Command({
  name: 'start-event',
  description: 'Begin the community event.',
})
@Injectable()
export class StartEventCommandService {
  constructor(
    private readonly eventsApiService: CommunityEventsManageApiService,
    private readonly logger: Logger,
  ) {}

  @Handler()
  @UseFilters(SlashValidationFilter, SlashExceptionFilter)
  @UseGuards(GuildOnlyGuard)
  async onStartCommand(
    @IA(SlashCommandPipe, ValidationPipe) startCommandDto: StartEventSlashDto,
    @IA() interaction: ChatInputCommandInteraction,
  ): Promise<InteractionReplyOptions> {
    this.logger.log(`attempting to start event for guild: ${interaction.guildId} and organizer: ${interaction.member?.user.id}`);
    this.logger.verbose(startCommandDto);
    startCommandDto.durationInMinutes ??= '30';
    try {

      const communityEvent = await this.eventsApiService.startEvent({
        guildSId: interaction.guildId?.toString() as string,
        title: startCommandDto.title.toString(),
        organizerSId: (interaction.member as GuildMember).id.toString() as string,
        voiceChannelSId: startCommandDto.voiceChannelId,
        endDate: new Date(new Date().getTime() + Number(startCommandDto.durationInMinutes) * 60_000).toISOString(),
        description: startCommandDto.description,
      });
    
      const voiceChannelName = interaction.guild?.channels.cache.get(startCommandDto.voiceChannelId)?.name as string;
      const guildName = interaction.guild?.name as string;
      const userTag = (interaction.member as GuildMember).user.tag;
      
      const startEventMsg = this.getStartEventMsg(
        startCommandDto.title,
        userTag,
        guildName,
        voiceChannelName,
        Number(startCommandDto.durationInMinutes),
        startCommandDto.description,
      );

      this.logger.log(`successfully started event: ${communityEvent.communityEventId}`);
      return {
        embeds: [startEventMsg]
      };
    } catch (e) {
      this.logger.error(e);
      if (e.response?.status === 409) {
        throw new SlashException(
          'An event is already in progress. Please end the current event before starting a new one.',
        );
      }
      throw new SlashException(
        'Failed to start event. Please contact support.',
      );
    }
  }

  private getStartEventMsg (
    title: string,
    userTag: string,
    guildName: string,
    voiceChannelName: string,
    durationInMinutes: number,
    description?: string,
  ): APIEmbed {
    return {
      title,
      color: Colors.Green,
      description,
      fields: [
        { name: 'Status', value: 'Community event started', inline: true },
        { name: 'Organizer', value: `${userTag} `, inline: true },
        { name: 'Discord Server', value: `${guildName} `, inline: true },
        { name: 'Voice Channel', value: `🎙️${voiceChannelName}`, inline: true },
        { name: 'Duration', value: `${durationInMinutes} minutes`, inline: true },
      ],
    };
  }
}
