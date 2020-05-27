const Discord = require('discord.js')
const config = require('./config.json')
const client = new Discord.Client()
const prefix = '!teams'

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const sliceByNumber = (array, number) => {
  const length = Math.ceil(array.length / number)
  return new Array(length).fill().map((_, i) =>
    array.slice(i * number, (i + 1) * number)
  )
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => {
  if (message.content === 'ping') {
    message.reply('Pong!')
  }
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return
  }

  try {
    const voiceChannel = message.member.voice.channel
    if (!voiceChannel) { return }
  
    const { members } = voiceChannel
    const usernames = members.map(member => member.user.username)
    const [_, teamCount] = message.content.slice(prefix.length).split(/ +/)

    let text = ''
    sliceByNumber(shuffle(usernames), teamCount).forEach((teams, index) => {
      text = text + `Team${index + 1}: ${teams.join(', ')}\n`
    })
    message.channel.send(text)
  } catch(error) {
    message.channel.send('エラーだよ。正しく使え。')
  }
})

client.login(config.botToken)
