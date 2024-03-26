# Commands
This app has a few slash commands that you can use to claim POAPs, start, 
and end events.

### Claim
```
/claim
```
Returns a list of claimable POAP urls for your discord account. Can be executed 
in any channel or direct message. If done in a channel, the bot will send you a 
ephemeral message with the list of claimable POAPs. If done in a direct message,
the bot will send you a direct message with the list of claimable POAPs.

### Start Event
```
/start-event [title] [channel] (description) (duration) (links)
```
Begin tracking attendance for an event. The bot will create a new event for the
specified voice channel.
- `title` - The title of the event. Maximum length of 250 characters and minimum
  length of 1 character.
- `channel` - The voice channel where the event is taking place. A dropdown list
  of voice channels will be provided to select from.
- `description` - (Optional) A description of the event.
- `duration` - (Optional) The duration of the event in minutes. A maximum of 720
  minutes (12 hours) and a minimum of 10 minutes. The default duration is 30 minutes.
- `links` - (Optional) A new line seperated file containing a list of claimable
  POAP urls. This is given by the POAP foundation.

### End Event
```
/end-event [channel] (links)
```
End tracking attendance for an event. There must be an active event for the specified
voice channel. The bot will mark that event as ended. It can optionally receive
a new line seperated list of claimable POAP urls that is stored for the event.
- `channel` - The voice channel where the event is taking place. A dropdown list
  of voice channels will be provided to select from.
- `links` - (Optional) A new line seperated file containing a list of claimable
  POAP urls. This is given by the POAP foundation. Appends to an existing list.

### Distribute
```
/distribute [community-event-id] [links]
```
Distribute POAPs to all users that attended the event. The bot will assign a unique 
POAP claim link to each user that attended the event. Attendees can then claim 
their POAP by /claim or visiting the web app.
- `community-event-id` - The id of the event that you want to distribute POAPs for.
- `links` - A new line seperated file containing a list of claimable
  POAP urls. This is given by the POAP foundation. Appends to an existing list.

### Mint POAP
```
/mint [copies] [email] [image]
```
Mint a collection of claimable POAPs for a specific event.
- `copies` - The number of copies of the POAP to mint.
- `email` - The email address of the recipient for the links.txt file.
- `image` - The image to use for the POAP. Must be a valid image url.

### Help
```
/help
```
Returns a list of all available commands and their descriptions.
