import { Command, Handler } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';

@Command({
  name: 'help',
  description:
    'Information on how to claim, start, stop, and send out POAP links.',
})
@Injectable()
export class HelpCommandService {
  static readonly SUPPORT_INVITE = 'https://discord.gg/TPEr4hy32x';

  @Handler()
  onPoapSubCommand() {
    return {
      embeds: [
        {
          title: 'POAP Distribution Information',
          description:
            'This bot can be used to distribute POAPs to attendees of an event. ',
          fields: [
            {
              name: '-> /claim',
              value:
                'Claim your POAP link for an event that you attended but did ' +
                'not receive. Must have been in the discussion for 10 minutes ' +
                'and must have not been deafened.',
              inline: false,
            },
            {
              name: '-> /start-event',
              value:
                'Start tracking attendees as they enter and exit the ' +
                'specified voice channel. Once the event is started it must ' +
                'be stopped by the same user or configured user/role.',
              inline: false,
            },
            {
              name: '-> /end-event',
              value:
                'Stop tracking attendees that enter the voice channel. ' +
                'The event has ended and a list of attendees is generated. ' +
                'Optionally send out POAP links to those who attended by ' +
                'providing a .txt file with the POAP links per line.',
              inline: false,
            },
            {
              name: '-> /distribute',
              value:
                'Distribute POAP links to a given list of attendees. ' +
                'The attendees .csv file is generated from /poap end command. ' +
                'The POAP links.txt file is generated from the POAP setup via email.',
              inline: false,
            },
            {
              name: '-> /mint',
              value:
                'Mint a POAP for an event, upload the PNG image to be minted, ' +
                'and get the links.txt file over email.',
              inline: false,
            },
            {
              name: '-> Useful Links',
              value:
                `[Support Center](${HelpCommandService.SUPPORT_INVITE})\n` +
                '[Documents](https://docs.degenapp.com)\n' +
                '[POAP Website](https://poap.xyz/)',
              inline: false,
            },
          ],
        },
      ],
    };
  }
}
