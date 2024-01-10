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
import {
  APIEmbed,
  ChatInputCommandInteraction,
  Colors,
  GuildMember,
  InteractionReplyOptions,
} from 'discord.js';
import { StartEventSlashDto } from './dto/start-event-slash.dto';
import { CommunityEventsManageApiService } from '@/api/community-events-manage/community-events-manage-api.service';
import { SlashErrorExceptionFilter } from '@/filters/slash-error-exception.filter';
import { SlashException } from '@/exceptions/slash.exception';
import { ValidationException } from '@/exceptions/validation.exception';
import { SlashValidationExceptionFilter } from '@/filters/slash-validation-exception.filter';

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
  @UseFilters(
    SlashDtoValidationFilter,
    SlashErrorExceptionFilter,
    SlashValidationExceptionFilter,
  )
  @UseGuards(GuildOnlyGuard)
  async onStartCommand(
    @IA(SlashCommandPipe, ValidationPipe) startEventDto: StartEventSlashDto,
    @IA() interaction: ChatInputCommandInteraction,
  ): Promise<InteractionReplyOptions> {
    startEventDto.durationInMinutes ??= '30';

    this.logger.log(
      `attempting to start event for guild: ${interaction.guildId} and organizer: ${interaction.member?.user.id}`,
    );
    this.logger.verbose(startEventDto);

    try {
      const response = await this.eventsApiService.startEvent({
        guildSId: interaction.guildId!.toString(),
        title: startEventDto.title.toString(),
        organizerSId: (interaction.member as GuildMember).id.toString(),
        voiceChannelSId: startEventDto.voiceChannelId,
        endDate: new Date(
          new Date().getTime() +
            Number(startEventDto.durationInMinutes) * 60_000,
        ).toISOString(),
        description: startEventDto.description,
        poapLinksUrl: startEventDto.poapLinks?.url,
      });

      const voiceChannelName = interaction.guild!.channels.cache.get(
        startEventDto.voiceChannelId,
      )!.name;
      const guildName = interaction.guild!.name;
      const userTag = (interaction.member as GuildMember).user.tag;

      const startEventMsg = this.getStartEventMsg(
        response.communityEventId,
        startEventDto.title,
        userTag,
        guildName,
        voiceChannelName,
        Number(startEventDto.durationInMinutes),
        startEventDto.description,
        response.availablePOAPs,
      );

      this.logger.log(
        `successfully started event: ${response.communityEventId}`,
      );
      return {
        embeds: [startEventMsg],
      };
    } catch (e) {
      this.logger.error(e);
      // TODO: please test test
      if (e instanceof HttpException) {
        if (e.getStatus() === 409) {
          throw new ValidationException(
            'An event is already in progress. Please end the current event before starting a new one.',
          );
        } else if (e.getStatus() === 403) {
          throw new ValidationException(
            'You are not authorized. Are you a POAP manager?',
          );
        }
      }
      throw new SlashException(
        'Failed to start event. Please contact support.',
      );
    }
  }

  private getStartEventMsg(
    communityEventId: string,
    title: string,
    userTag: string,
    guildName: string,
    voiceChannelName: string,
    durationInMinutes: number,
    description?: string,
    availablePOAPs?: number,
  ): APIEmbed {
    return {
      title,
      color: Colors.Green,
      description,
      fields: [
        { name: 'ID', value: `${communityEventId}`, inline: true },
        { name: 'Status', value: 'Community event started', inline: true },
        { name: 'Organizer', value: `${userTag} `, inline: true },
        { name: 'Discord Server', value: `${guildName} `, inline: true },
        { name: 'Voice Channel', value: `🎙️${voiceChannelName}`, inline: true },
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
