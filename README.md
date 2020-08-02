# Discord Teams Bot
Divide the members participating in the voice channel into teams.

# Commands
```
!teams <number>
```

ex:
```
!teams 3
```
> Need to join the voice channel.

# How to add this bot to the server

### Already hosted bots
Here: https://discord.com/api/oauth2/authorize?client_id=715247338607607919&permissions=2048&redirect_uri=https%3A%2F%2Fgithub.com%2Fkra8&scope=bot

### Self hosting
- Copy environment variables file
```
cp .env.example .env
```

- Add your bot token
```
DISCORD_BOT_TOKEN=your_token

COMMAND_PREFIX=!teams
```

- Install depends and build
```
yarn install && yarn build
```

- Run
```
node dist/index.js
```