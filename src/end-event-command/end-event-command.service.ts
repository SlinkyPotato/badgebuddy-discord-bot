import { CommunityEventsManageApiService } from '@/api/community-events-manage/community-events-manage-api.service';
import { GuildOnlyGuard } from '@/guards/guild-only-execution.guard';
import { SlashValidationFilter } from '@/filters/slash-validation.filter';
import { SlashCommandPipe } from '@discord-nestjs/common';
import { Command, Handler, IA } from '@discord-nestjs/core';
import { Injectable, Logger, UseFilters, UseGuards, ValidationPipe } from '@nestjs/common';
import { EndEventSlashDto } from './dto/end-event-slash/end-event-slash.dto';
import { APIEmbed, ChatInputCommandInteraction, Colors } from 'discord.js';
import { SlashExceptionFilter } from '@/filters/slash-exception.filter';
import { SlashException } from '@/exceptions/slash.exception';

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
  @UseFilters(SlashValidationFilter, SlashExceptionFilter)
  @UseGuards(GuildOnlyGuard)
  async onEndCommand(
    @IA(SlashCommandPipe, ValidationPipe) endEventDto: EndEventSlashDto,
    @IA() interaction: ChatInputCommandInteraction,
  ) {
    this.logger.log(`attempting to end event for guild: ${interaction.guild!.id} and organizer: ${interaction.member!.user.id}`)
    this.logger.verbose(endEventDto);

    try {
      const response = await this.eventsApiService.endEvent(interaction.member!.user.id, {
        guildSId: interaction.guild!.id,
        voiceChannelSId: endEventDto.voiceChannelId,
      });

      const voiceChannelName = interaction.guild?.channels.cache.get(endEventDto.voiceChannelId)?.name as string;
      const durationInMinutes = Math.round((new Date(response.endDate).getTime() - new Date(response.startDate).getTime()) / 60_000);
      const endEventMsg = this.getEndEventMsg(
        response.title,
        response.organizerUsername,
        interaction.guild!.name,
        voiceChannelName,
        durationInMinutes,
        response.description,
      );

      this.logger.log(`successfully ended event: ${response.communityEventId}`);
  
      return {
        embeds: [endEventMsg],
      };
    } catch (e) {
      this.logger.error(e);
      if (e.response?.status === 404) {
        throw new SlashException('Event not found.');
      }
      throw new SlashException(e.message);
    }
  }

  private getEndEventMsg (
    title: string,
    userTag: string,
    guildName: string,
    voiceChannelName: string,
    durationInMinutes: number,
    description?: string,
  ): APIEmbed {
    return {
      title,
      color: Colors.DarkRed,
      description,
      fields: [
        { name: 'Status', value: 'Community event ended', inline: true },
        { name: 'Organizer', value: `${userTag} `, inline: true },
        { name: 'Discord Server', value: `${guildName} `, inline: true },
        { name: 'Voice Channel', value: `🎙${voiceChannelName} `, inline: true },
        { name: 'Duration', value: `${durationInMinutes} minutes`, inline: true },
      ],
    };
  }
}
