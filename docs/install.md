# Install

This discord bot develop is platform agnostic. It can be installed locally on windows, or unix systems where the discord
application is available.

These tools can make development quick and are recommended:

-   [git CLI](https://git-scm.com) - version control system
-   [nodejs v14.17.0](https://nodejs.org/en/) - js runtime built on chrome's v8 engine
-   [nvm](https://github.com/nvm-sh/nvm) - easily change node versions
-   [pnpm](https://pnpm.io/) - dependency management system
-   [Docker](https://docs.docker.com/desktop/) - for local development
-   [iterm2](https://iterm2.com/) - enhanced terminal for macOS
-   [discord](https://discord.com/) - popular chat application used for gaming and organized communities

## Configuration Setup

Before the bot is ready to run there are a few configuration items that should be done. First few steps can be done following
the [discord.js guide](https://discordjs.guide/#before-you-begin);

### 1. Create environment file

Please create a `.env` with the keys below

```
DISCORD_BOT_TOKEN=[your bot token]
DISCORD_BOT_APPLICATION_ID=[your application id]
DISCORD_BOT_PUBLIC_KEY=[your public key]
DISCORD_OWNER_ID=[your discord account id]
```

### 2. Generate bot token

[https://discordjs.guide/preparations/setting-up-a-bot-application.html](https://discordjs.guide/preparations/setting-up-a-bot-application.html)
Create your own discord application and then create your own bot API key.

Retrieve the App's client ID
![](images/create_app.png)

Retrieve the bot token
![](images/create_bot.png)

### 3. Invite bot to your personal discord

[https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links)
The newly created bot cab be invited to your own discord server.

```
https://discord.com/oauth2/authorize?client_id=REPLACE_THIS_HERE&scope=bot+applications.commands
```

### 4. Enable Developer Mode

There should be a small cog near your icon photo labeled "User Settings". Hitting that there should be an option to enable
developer mode
![](images/discord_developer_mode.png)

### 5. Run application

```bash
pnpm install
pnpm dev
```
