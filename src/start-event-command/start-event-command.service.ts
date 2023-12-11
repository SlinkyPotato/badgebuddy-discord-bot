import { CommandExceptionFilter } from '@/command-validation.filter';
import CommandException from '@/command.exception';
import { GuildOnlyGuard as GuildOnlyGuard } from '@/guild-only-execution.guard';
import { SlashValidationFilter } from '@/slash-validation.filter';
import { SlashCommandPipe } from '@discord-nestjs/common';
import { Command, Handler, IA } from '@discord-nestjs/core';
import { Injectable, Logger, UseFilters, UseGuards, ValidationPipe } from '@nestjs/common';
import { APIEmbed, ChatInputCommandInteraction, Colors, GuildMember, InteractionReplyOptions } from 'discord.js';
import { StartEventDto } from './dto/start-event.dto';
import {
  CommunityEventsApiService
} from '@/api/community-events/community-events-api.service';

@Command({
  name: 'start-event',
  description: 'Begin the community event.',
})
@Injectable()
export class StartEventCommandService {
  constructor(
    private readonly eventsApiService: CommunityEventsApiService,
    private readonly logger: Logger,
  ) {}

  @Handler()
  @UseFilters(SlashValidationFilter, CommandExceptionFilter)
  @UseGuards(GuildOnlyGuard)
  async onStartCommand(
    @IA(SlashCommandPipe, ValidationPipe) startCommandDto: StartEventDto,
    @IA() interaction: ChatInputCommandInteraction,
  ): Promise<InteractionReplyOptions> {
    this.logger.verbose(startCommandDto);
    startCommandDto.durationInMinutes ??= '30';
    try {
    
      const communityEvent = await this.eventsApiService.startEvent({
        guildSId: interaction.guildId?.toString() as string,
        title: startCommandDto.title.toString(),
        organizerSId: (interaction.member as GuildMember).id.toString() as string,
        voiceChannelSId: startCommandDto.voiceChannelId,
        endDate: new Date(new Date().getTime() + Number(startCommandDto.durationInMinutes) * 60000).toISOString(),
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
      );

      this.logger.log(`successfully started event: ${communityEvent.communityEventId}`);
      return { embeds: [startEventMsg] };
    } catch (e) {
      this.logger.error(e);
      throw new CommandException(
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
  ): APIEmbed {
    return {
      title: 'Community Event Started',
      color: Colors.Green,
      fields: [
        { name: 'Event', value: `${title} `, inline: true },
        { name: 'Organizer', value: `${userTag} `, inline: true },
        { name: 'Discord Server', value: `${guildName} `, inline: true },
        { name: 'Voice Channel', value: `🎙️${voiceChannelName}`, inline: true },
        { name: 'Duration', value: `${durationInMinutes} minutes`, inline: true },
      ],
    };
  }
}
