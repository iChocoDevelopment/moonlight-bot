const { Client, MessageEmbed } = require('discord.js');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
var bn = '-> Moonlight <-'


client.on('ready', async () => {
    client.user.setStatus('dnd')
    client.user.setActivity('Moonlight bot by Choco Development', { type: "playing" });
    console.log(bn + ' -> Ready!')
    require('./assets/commands')
    require('./assets/website.js')
    require('./assets/automod.js')
})



client.login(require('./config.json').token)
module.exports.client = client
module.exports.bn = bn

process.on('uncaughtException', (e) => {
    console.log('> Ignored fatal error ' + e)
})