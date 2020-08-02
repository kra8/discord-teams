import Discord from 'discord.js'

class Bot {
  client: Discord.Client
  token: string
  prefix: string

  constructor(token: string, prefix: string) {
    this.client = new Discord.Client()
    this.token = token
    this.prefix = prefix
  }

  run() {
    this.client.login(this.token)
  }

  onReady(callback: (client: any) => void) {
    this.client.on('ready', () => callback(this.client))
  }

  onMessage(callback: (message: any) => void) {
    this.client.on('message', message => {
      if (!message.content.startsWith(this.prefix) || message.author.bot) {
        return
      }
      callback(message)
    })
  }
}

export default Bot
