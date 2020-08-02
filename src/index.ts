import { shuffle, sliceByNumber } from './utils'
import Bot from './Bot'

const prefix = process.env.COMMAND_PREFIX || '!teams'
const token = process.env.DISCORD_BOT_TOKEN
const bot = new Bot(token, prefix)

bot.onReady(client => {
  console.log(`Logged in as ${client.user.tag}!`)
})

bot.onMessage(message => {
  try {
    const voiceChannel = message.member.voice.channel
    if (!voiceChannel) {
      message.channel.send('Need to join the voice channel.')
      return
    }

    const { members } = voiceChannel
    const usernames = members.map(member => member.user.username)
    const [_, teamCount] = message.content.slice(prefix.length).split(/ +/)

    let text = ''
    sliceByNumber(shuffle(usernames), teamCount).forEach((teams, index) => {
      text = text + `Team${index + 1}: ${teams.join(', ')}\n`
    })
    message.channel.send(text)
  } catch(error) {
    message.channel.send('error: signature is `!teams <number>`')
  }
})

bot.run()
