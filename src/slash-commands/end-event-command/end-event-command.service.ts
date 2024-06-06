import { CommunityEventsManageApiService } from '@/api-badgebuddy/community-events-manage-api/community-events-manage-api.service';
import { GuildOnlyGuard } from '@/guards/guild-only-execution.guard';
import { SlashDtoValidationFilter } from '@/filters/slash-dto-validation.filter';
import { SlashCommandPipe } from '@discord-nestjs/common';
import { Command, Handler, IA } from '@discord-nestjs/core';
import {
  HttpException,
  Injectable,
  Logger,
  UseFilters,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { EndEventSlashDto } from './dto/end-event-slash/end-event-slash.dto';
import { APIEmbed, ChatInputCommandInteraction, Colors } from 'discord.js';
import { SlashErrorExceptionFilter } from '@/filters/slash-error-exception.filter';
import { SlashException } from '@/exceptions/slash.exception';
import { ValidationException } from '@/exceptions/validation.exception';
import { SlashValidationExceptionFilter } from '@/filters/slash-validation-exception.filter';

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
  @UseFilters(
    SlashDtoValidationFilter,
    SlashErrorExceptionFilter,
    SlashValidationExceptionFilter,
  )
  @UseGuards(GuildOnlyGuard)
  async onEndCommand(
    @IA(SlashCommandPipe, ValidationPipe) endEventDto: EndEventSlashDto,
    @IA() interaction: ChatInputCommandInteraction,
  ) {
    this.logger.log(
      `attempting to end event for guild: ${
        interaction.guild!.id
      } and organizer: ${interaction.member!.user.id}`,
    );
    this.logger.verbose(endEventDto);

    try {
      const response = await this.eventsApiService.endEvent(
        {
          guildSId: interaction.guild!.id,
          voiceChannelSId: endEventDto.voiceChannelId,
          poapLinksUrl: endEventDto.poapLinks?.url,
        },
      );

      const voiceChannelName = interaction.guild!.channels.cache.get(
        endEventDto.voiceChannelId,
      )!.name;

      const durationInMinutes = Math.round(
        (new Date(response.endDate).getTime() -
          new Date(response.startDate).getTime()) /
          60_000,
      );
      const endEventMsg = this.getEndEventMsg(
        response.communityEventId,
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
      // TODO: please test this
      if (e instanceof HttpException) {
        if (e.getStatus() === 404) {
          throw new ValidationException(
            'Active event not found for voice channel.',
          );
        } else if (e.getStatus() === 403) {
          throw new ValidationException(
            'You are not authorized. Are you a POAP manager?',
          );
        }
      }
      throw new SlashException('Failed to end event. Please contact support.');
    }
  }

  private getEndEventMsg(
    communityEventId: string,
    title: string,
    userTag: string,
    guildName: string,
    voiceChannelName: string,
    durationInMinutes: number,
    description?: string,
    availablePOAPs?: number,
  ): APIEmbed {
    availablePOAPs = availablePOAPs ?? 0;
    return {
      title,
      color: Colors.DarkRed,
      description,
      fields: [
        { name: 'ID', value: `${communityEventId}`, inline: true },
        { name: 'Status', value: 'Community event ended', inline: true },
        { name: 'Organizer', value: `${userTag} `, inline: true },
        { name: 'Discord Server', value: `${guildName} `, inline: true },
        {
          name: 'Voice Channel',
          value: `🎙${voiceChannelName} `,
          inline: true,
        },
        {
          name: 'Duration',
          value: `${durationInMinutes} minutes`,
          inline: true,
        },
        { name: 'Available POAPs', value: `${availablePOAPs}`, inline: true },
      ],
    };
  }
}
