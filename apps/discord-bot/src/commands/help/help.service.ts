import { Command, Handler } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';

@Command({
  name: 'help',
  description:
    'Information on how to claim, start, stop, and send out POAP links.',
})
@Injectable()
export class HelpService {
  static readonly SUPPORT_INVITE = 'https://discord.gg/TPEr4hy32x';
  static readonly FEATURE_REQUEST_CHANNEL_INVITE =
    'https://discord.gg/TPEr4hy32x';

  @Handler()
  async onPoapSubCommand() {
    return {
      embeds: [
        {
          title: 'POAP Distribution Information',
          description:
            'DEGEN is a discord bot that helps distribute POAPs to eligible participates. It can `mint` POAPs before an event has started.',
          fields: [
            {
              name: '-> /setup',
              value:
                'Initialize all of the settings needed for DEGEN to operate. This command should automatically execute after degen is invited.',
              inline: false,
            },
            {
              name: '-> /poap mint',
              value:
                'Mint a POAP for an event, upload the PNG image to be minted, and get the links.txt file over email.',
              inline: false,
            },
            {
              name: '-> /poap distribute',
              value:
                'Distribute POAP links to a given list of attendees. The attendees .csv file is generated from ' +
                '/poap end command. The POAP links.txt file is generated from the POAP setup via email.',
              inline: false,
            },
            {
              name: '-> /poap claim, -> /claim',
              value:
                'Claim your missing POAP for an event that you attended but did not receive. Must have been in the discussion for 10 minutes and must have not been deafened.',
              inline: false,
            },
            {
              name: '-> /poap start',
              value:
                'Start tracking attendees as they enter and exit the specified voice channel. ' +
                'Once the event is started it must be stopped by the same user or configured user/role.',
              inline: false,
            },
            {
              name: '-> /poap end',
              value:
                'Stop tracking attendees that enter the voice channel. The event has ended and a list of attendees is generated. ' +
                'Optionally send out POAP links to those who attended by providing a .txt file with the POAP links per line.',
              inline: false,
            },
            {
              name: '-> Useful Links',
              value:
                `[DEGEN Support Center](${HelpService.SUPPORT_INVITE})\n` +
                '[Documents](https://docs.degenapp.com)\n' +
                '[Feature Request Feedback](' +
                HelpService.FEATURE_REQUEST_CHANNEL_INVITE +
                ')\n' +
                '[POAP Website](https://poap.xyz/)',
              inline: false,
            },
          ],
        },
      ],
    };
  }
}
