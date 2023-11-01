export class GetActiveEventsResponseDto {
  events: ActiveEvent[];
}

class ActiveEvent {
  _id: string;
  eventName: string;
  guildId: string;
  voiceChannelId: string;
  organizerId: string;
  startDate: string;
  endDate: string;
}
