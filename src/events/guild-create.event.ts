import { Injectable, Logger } from '@nestjs/common';
import { InjectDiscordClient, On } from '@discord-nestjs/core';
import {
  CategoryChannel,
  Client,
  Colors,
  Guild,
  PermissionsBitField,
  Role,
  ChannelType,
  TextChannel,
  NewsChannel,
} from 'discord.js';
import axios from 'axios';

@Injectable()
export class GuildCreateEvent {
  private readonly logger: Logger = new Logger(GuildCreateEvent.name);
  private static readonly HOW_TO_ARRANGE_ROLE_URL =
    'https://degen-public.s3.amazonaws.com/public/assets/how_to_arrange_authorized_degens_role.gif';
  private static readonly HOW_TO_ADD_ROLE_URL =
    'https://degen-public.s3.amazonaws.com/public/assets/how_to_add_degen_role.gif';

  private readonly allowedPermissions = [
    PermissionsBitField.Flags.ViewChannel,
    PermissionsBitField.Flags.SendMessagesInThreads,
    PermissionsBitField.Flags.SendMessages,
    PermissionsBitField.Flags.AttachFiles,
    PermissionsBitField.Flags.CreatePrivateThreads,
    PermissionsBitField.Flags.ManageMessages,
    PermissionsBitField.Flags.ManageThreads,
    PermissionsBitField.Flags.UseApplicationCommands,
  ];
  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  @On('guildCreate')
  async onGuild(guild: Guild): Promise<void> {
    this.logger.log(`guild joined, guildId: ${guild.id}, name: ${guild.name}`);
    const role: Role = await this.createAuthorizedRoles(guild);
    await this.assignRoleToBot(guild, role);
    const category = await this.createPOAPCategory(guild, role);
    const channel = await this.createPOAPChannel(guild, role, category);
    let newsChannel = null;
    // optionally create newsChannel channel
    if (guild.features.includes('COMMUNITY')) {
      newsChannel = await this.createAnnouncementsChannel(guild, role);
      this.announcePOAPChannel(newsChannel);
    }
    this.announceInstructions(channel, role);
    // call /registration endpoint
    await this.callRegistrationEndpoint(
      guild,
      role,
      category,
      channel,
      newsChannel,
    );
  }

  private async createAuthorizedRoles(guild: Guild): Promise<Role> {
    this.logger.debug('attempting to create authorized role');
    const role: Role = await guild.roles.create({
      name: 'POAP Managers',
      color: Colors.DarkGreen,
      permissions: this.allowedPermissions,
      hoist: true,
    });

    this.logger.debug(`role created, roleID: ${role.id}`);

    this.logger.debug(
      `POAP Managers role create, roleId: ${role.id}, name: ${role.name}`,
    );
    return role;
  }

  private async assignRoleToBot(guild: Guild, role: Role): Promise<void> {
    this.logger.debug('attempting to assign role to bot');
    const botMember = await guild.members.fetch(
      process.env.DISCORD_BOT_APPLICATION_ID ?? '',
    );
    await botMember.roles.add(role);
    this.logger.debug('role assigned to bot');
  }

  private async createPOAPCategory(
    guild: Guild,
    role: Role,
  ): Promise<CategoryChannel> {
    this.logger.log('attempting to create POAP category');
    const category = await guild.channels.create({
      name: 'POAPs Management',
      reason: 'Creating POAP category',
      type: ChannelType.GuildCategory,
      position: 0,
      permissionOverwrites: [
        {
          id: role.id,
          allow: this.allowedPermissions,
        },
        {
          id: process.env.DISCORD_BOT_APPLICATION_ID ?? '',
          allow: this.allowedPermissions,
        },
        {
          id: guild.roles.everyone.id,
          deny: [PermissionsBitField.Flags.ViewChannel],
        },
      ],
    });
    if (!category || category.type !== ChannelType.GuildCategory) {
      throw new Error('failed to setup category');
    }
    this.logger.log(`category created, categoryId: ${category.id}`);
    return category;
  }

  private async createPOAPChannel(
    guild: Guild,
    role: Role,
    category: CategoryChannel,
  ): Promise<TextChannel> {
    this.logger.log('attempting to create POAP channel');

    if (!guild.available) {
      this.logger.warn(
        `guild outage for, guildId: ${guild.id}, guildName: ${guild.name}`,
      );
      throw new Error('failed to setup on downed discord server');
    }
    this.logger.debug('guild is available');

    const channel = await guild.channels.create({
      name: '🤖-commands',
      reason: 'channel registration',
      type: ChannelType.GuildText,
      position: 0,
      parent: category,
    });
    if (!channel || channel.type !== ChannelType.GuildText) {
      throw new Error('failed to setup channel');
    }
    this.logger.log(`channel created, channelId: ${channel.id}`);
    return channel;
  }

  private async createAnnouncementsChannel(guild: Guild, role: Role) {
    this.logger.log('attempting to create announcements channel');
    const newsChannel: NewsChannel = await guild.channels.create({
      name: 'POAP Announcements',
      reason: 'news channel registration',
      type: ChannelType.GuildNews,
      permissionOverwrites: [
        {
          id: role.id,
          allow: this.allowedPermissions,
        },
        {
          id: process.env.DISCORD_BOT_APPLICATION_ID ?? '',
          allow: this.allowedPermissions,
        },
        {
          id: guild.roles.everyone.id,
          deny: [
            PermissionsBitField.Flags.SendMessages,
            PermissionsBitField.Flags.SendMessagesInThreads,
            PermissionsBitField.Flags.CreatePublicThreads,
          ],
        },
        {
          id: guild.roles.everyone.id,
          allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.ReadMessageHistory,
            PermissionsBitField.Flags.AddReactions,
          ],
        },
      ],
    });
    if (!newsChannel || newsChannel.type !== ChannelType.GuildNews) {
      throw new Error('failed to setup channel');
    }
    this.logger.log(`channel created, channelId: ${newsChannel.id}`);
    return newsChannel;
  }

  private announcePOAPChannel(announcementsChannel: NewsChannel) {
    this.logger.log('attempting to announce async news channel');
    announcementsChannel.send({
      embeds: [
        {
          title: 'POAP Announcements Channel',
          color: Colors.Green,
          description:
            'This channel is for POAP announcements. Here the community can see when POAP events begin, end, and are ready to be claimed.',
        },
      ],
    });
  }

  private announceInstructions(channel: TextChannel, role: Role) {
    this.logger.debug('attempting to announce async instructions');
    channel.send({
      embeds: [
        {
          title: 'POAP Management Channel',
          color: Colors.Green,
          description:
            'This channel is for managing community POAPs. You can begin, end, distribute, and mint POAPs from this channel. ',
        },
        {
          title: 'Permissions',
          color: Colors.Green,
          description:
            `Only users with the \`${role.name}\` role can start, end, and distribute POAPs. ` +
            `Please move the \`@${role.name}\` to the highest role position you feel most comfortable. ` +
            'This will ensure that the bot has the correct permissions to manage POAPs.',
          fields: [
            {
              name: 'How To Arrange Role',
              value: GuildCreateEvent.HOW_TO_ARRANGE_ROLE_URL,
            },
          ],
        },
        {
          title: 'Usage',
          color: Colors.Green,
          description:
            'To create begin POAP tracking, type `/start` followed by the POAP name and voice channel. ' +
            'For example: `/start name: Community Call channel: voice-channel`. For additional help, type `/help`.',
          fields: [
            {
              name: 'How to Add Role',
              value: GuildCreateEvent.HOW_TO_ADD_ROLE_URL,
            },
          ],
        },
      ],
    });
  }

  private async callRegistrationEndpoint(
    guild: Guild,
    role: Role,
    category: CategoryChannel,
    channel: TextChannel,
    newsChannel: NewsChannel | null,
  ) {
    try {
      const response = await axios.post(
        (process.env.BADGE_BUDDY_API_HOST ?? '') + '/registration',
        {
          guildId: guild.id,
          guildName: guild.name,
          roleId: role.id,
          categoryId: category.id,
          channelId: channel.id,
          newsChannelId: newsChannel?.id,
        },
      );
      if (response.status !== 201) {
        throw new Error('failed to register guild');
      }
    } catch (error) {
      throw error;
    }
  }
}
