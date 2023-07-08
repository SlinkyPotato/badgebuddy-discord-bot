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

@Injectable()
export class GuildCreateEvent {
  private readonly logger = new Logger(GuildCreateEvent.name);

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
    const role = await this.createAuthorizedRoles(guild);
    await this.assignRoleToBot(guild, role);
    const category = await this.createPOAPCategory(guild, role);
    const channel = await this.createPOAPChannel(guild, role, category);

    // optionally create announcements channel
    if (guild.features.includes('COMMUNITY')) {
      const announcementsChannel = await this.createAnnouncementsChannel(
        guild,
        role,
      );
      this.announcePOAPChannel(announcementsChannel);
    }
    this.announceInstructions(channel, role);

    // call /registration endpoint
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
    this.logger.debug('attempting to create POAP category');
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
          id: process.env.DISCORD_BOT_ID ?? '',
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
    this.logger.debug(`category created, categoryId: ${category.id}`);
    return category;
  }

  private async createPOAPChannel(
    guild: Guild,
    role: Role,
    category: CategoryChannel,
  ): Promise<TextChannel> {
    this.logger.debug('attempting to create POAP channel');

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
    this.logger.debug(`channel created, channelId: ${channel.id}`);
    return channel;
  }

  private async createAnnouncementsChannel(guild: Guild, role: Role) {
    this.logger.debug('attempting to create announcements channel');
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
          id: process.env.DISCORD_BOT_ID ?? '',
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
    this.logger.debug(`channel created, channelId: ${newsChannel.id}`);
    return newsChannel;
  }

  private announcePOAPChannel(announcementsChannel: NewsChannel) {
    this.logger.debug('attempting to announce instructions');
    announcementsChannel.send({
      embeds: [
        {
          title: 'POAP Announcements Channel',
          color: Colors.Green,
          description:
            'This channel is for POAP announcements only. Here the community can see when POAPs events begin, end, and ready to be claimed.',
        },
      ],
    });
  }

  private announceInstructions(channel: TextChannel, role: Role) {
    this.logger.debug('attempting to announce instructions');
    channel.send({
      embeds: [
        {
          title: 'POAP Management Channel',
          color: Colors.Green,
          description:
            'This channel is for managing your POAPs. You can create, update, and delete POAPs from this channel.',
        },
        {
          title: 'Instructions',
          color: Colors.Green,
          description: `To create a POAP, type \`!create\` followed by the POAP name. For example: \`!create My POAP\``,
        },
        {
          title: 'Permissions',
          color: Colors.Green,
          description: `Only users with the \`${role.name}\` role can create POAPs.`,
        },
      ],
    });
  }
}
