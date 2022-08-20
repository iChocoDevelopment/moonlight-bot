var client = require('../main.js').client
var main = require('../main')
var bn = '-> Moonlight <-'
var prefix = '?'
const { Client, MessageEmbed } = require('discord.js');
var checkPerms = require('./permissionchecker')
    var message;
    
    var warns = []

    const iuembed = new MessageEmbed()
        .setTitle(":crescent_moon: -> Moonlight <- :crescent_moon:")
        .setDescription("❌ Error: Member does not exist")
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter({ text: 'Developed by iChocoDev#8252' });
    const npembed = new MessageEmbed()
        .setTitle(":crescent_moon: -> Moonlight <- :crescent_moon:")
        .setDescription("❌ ERROR EXECUTING THIS ACTION!")
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter({ text: 'Developed by iChocoDev#8252' });

    client.on('messageCreate', (msg) => {

        message = msg
        console.log("Discord > " + msg.content)
        if (msg.author.id === client.user.id) return;
        if (msg.content.startsWith(prefix)) {
            if (checkPerms(msg)) {
                console.log(bn + ' -> Received ' + msg.content)
                var cmd = msg.content.split(' ')
                if (cmd[0] === prefix + "ban") {
                    const User = msg.mentions.members.first();
                    if (!User) return msg.channel.send(iuembed)
                    let banReason = cmd.slice(2).join(' ')
                    if (!banReason) {
                        banReason = "N/A"
                    }
                    const embed = new MessageEmbed()
                        .setTitle(":crescent_moon: " + main.bn + " :crescent_moon:")
                        .setDescription(`${User} Sucessfully banned for:
    ${banReason}
    Banned by: ${msg.author.username}#${msg.author.discriminator}`)
                        .setColor("RANDOM")
                        .setTimestamp()
                        .setFooter({ text: 'Developed by iChocoDev#8252 in 2022' });
                    msg.channel.send({ embeds: [embed] })
                    const bembed = new MessageEmbed()
                        .setTitle(":crescent_moon: " + main.bn + " :crescent_moon:")
                        .setDescription(`You have been BANNED  for:
    ${banReason}
    Kicked by: ${msg.author.username}#${msg.author.discriminator}`)
                        .setColor("RANDOM")
                        .setTimestamp()
                        .setFooter({ text: 'Developed by iChocoDev#8252 in 2022' });
                    User.ban(banReason, (err) => {
                        if (!err) {
                            msg.channel.send({ embeds: [embed] })
                            User.send({ embeds: [bembed] });
                        }else{
                            msg.channel.send({ embeds: [npembed] })
                        }
                    })
                }
                if (cmd[0] === prefix + "kick") {
                    const User = msg.mentions.members.first();
                    if (!User) return msg.channel.send(iuembed)
                    let banReason = cmd.slice(2).join(' ')
                    if (!banReason) {
                        banReason = "N/A"
                    }
                    const embed = new MessageEmbed()
                        .setTitle(":crescent_moon: " + main.bn + " :crescent_moon:")
                        .setDescription(`${User} Sucessfully kicked for:
    ${banReason}
    Kicked by: ${msg.author.username}#${msg.author.discriminator}`)
                        .setColor("RANDOM")
                        .setTimestamp()
                        .setFooter({ text: 'Developed by iChocoDev#8252 in 2022' });

                    const kembed = new MessageEmbed()
                        .setTitle(":crescent_moon: " + main.bn + " :crescent_moon:")
                        .setDescription(`You have been KICKED for:
    ${banReason}
    Kicked by: ${msg.author.username}#${msg.author.discriminator}`)
                        .setColor("RANDOM")
                        .setTimestamp()
                        .setFooter({ text: 'Developed by iChocoDev#8252 in 2022' });
                    User.kick(banReason, (err) => {
                        if (!err) {
                            msg.channel.send({ embeds: [embed] })
                            User.send({ embeds: [kembed] });
                        }else{
                            msg.channel.send({ embeds: [npembed] })
                        }
                    })
                }
                if (cmd[0] === prefix + "timeout") {
                    const User = msg.mentions.members.first();
                    if (!User) return msg.channel.send(iuembed)
                    let banTime = parseInt(cmd[2], 10) * 1000
                    if (!banTime) {
                        banTime = 10000
                    }
                    let banReason = cmd.slice(3).join(' ')
                    if (!banReason) {
                        banReason = 'N/A'
                    }
                    const embed = new MessageEmbed()
                        .setTitle(":crescent_moon: " + main.bn + " :crescent_moon:")
                        .setDescription(`${User} Sucessfully timeout for:
    ${banTime / 1000} seconds
    Reason:
    ${banReason}
    Timeout by: ${msg.author.username}#${msg.author.discriminator}`)
                        .setColor("RANDOM")
                        .setTimestamp()
                        .setFooter({ text: 'Developed by iChocoDev#8252 in 2022' });
                    msg.channel.send({ embeds: [embed] })

                    
                    const tembed = new MessageEmbed()
                        .setTitle(":crescent_moon: " + main.bn + " :crescent_moon:")
                        .setDescription(`You have been TIMEOUT for:
    ${banTime / 1000} seconds
    Reason:
    ${banReason}
    Timeout by: ${msg.author.username}#${msg.author.discriminator}`)
                        .setColor("RANDOM")
                        .setTimestamp()
                        .setFooter({ text: 'Developed by iChocoDev#8252 in 2022' });
                    User.timeout(banTime, (err) => {
                        if (!err) {
                            msg.channel.send({ embeds: [embed] })
                            User.send({ embeds: [tembed] });
                        }else{
                            msg.channel.send({ embeds: [npembed] })
                        }
                    })
                }
            } else {
                const npembed = new MessageEmbed()
                    .setTitle(":crescent_moon: " + main.bn + " :crescent_moon:")
                    .setDescription(`No permission`)
                    .setColor("RANDOM")
                    .setTimestamp()
                    .setFooter({ text: 'Developed by iChocoDev#8252 in 2022' });

                msg.channel.send({ embeds: [npembed] })
            }
            if(cmd[0] === prefix + "clear") {
                var amount = parseInt(cmd[1])

                if (!amount) return message.channel.send("Please specify the amount of messages you want me to delete")
                if (amount > 100 || amount < 1) return message.channel.send("Please select a number *between* 100 and 1")
        
                msg.channel.bulkDelete(amount).catch(err => {
                    message.channel.send(':x: Due to Discord Limitations, I cannot delete messages older than 14 days')
                })
                run()
                async function run() {
                    let msga = await msg.channel.send(`Deleting \`${amount}\` messages`)
                    setTimeout(() => {
                        msga.edit(`\`${amount}\` messages deleted!`)
                    }, 2000)
                    setTimeout(() => {
                        msga.delete()
                    }, 30000)
                }
            }
            if(cmd[0] === prefix+'ping') {
                message.channel.send(`:crescent_moon: Latency is ${Date.now() - message.createdTimestamp}ms.
API Latency is ${Math.round(client.ws.ping)}ms.`);
            }
            if (cmd[0] === prefix+'slowmode') {
                var time = parseInt(cmd[1]) || 10
                message.channel.setRateLimitPerUser(time, "Command calling");
                message.reply('Slowmode set to ' + time + ' seconds!')
            }
    }
})