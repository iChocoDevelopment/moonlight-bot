const { client } = require("../main");
const checkPerms = require("./permissionchecker");
let blacklisted = [
    'fuck',
    'tf',
    'shit',
    'dick',
    'bitch',
    'son of a',
    'asshole',
    'bastard',
    'damn',
    'c*nt',
    'cock',
    'muff',
    'pussy',
    'ass',
    'cunt',
    'nigg',
    'suck',
    'urmom',
    'ur mom',
    'gay',
    'lesbian',
    'mother',
    'mum'
];

client.on('messageCreate', (message) => {
    var foundInText = false
    console.log('Auto-Mod-Lib -> Checking: ' + message.content)
    if(message.guild.ownerID|| message.author.bot) return;
    if(message.content.includes("https://") || message.content.includes("http://") || message.content.includes("discord.gg/")) { 
        message.delete()
        if (!warns[message.author.id]) {
            warns[message.author.id] = 1
        }else{
            warns[message.author.id]++
        }
        var embed = new MessageEmbed()
            .setTitle(":crescent_moon: " + main.bn + " :crescent_moon:")
            .setDescription(`${message.author}, Links are not allowed in this server, this is your #${warns[message.author.id]} warn!`) 
            .setFooter('Powered by Choco Development')
            .setColor('#00298c')
            .setTimestamp()
                
        setTimeout(async () => {
            var warn = await message.channel.send({ embeds: [embed] })
                    setTimeout(() => {
                        warn.delete()
                    }, 5000)
                }, 5)
                if (warns[message.author.id] > 2) {
                    async function tm() {
                        message.member.timeout(3600000)
                        message.channel.send(`${message.author} got timeout for 1 hour reaching 3 warns or more.`)
                    }
                    tm()
                }
            }
            for (var i in blacklisted) {
                if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
            }
            if (foundInText) {
                message.delete();
                message.channel.send(`${message.author} got muted for 10 minutes for using a bad word`);
                message.member.timeout(600000)
            }
            antispam(message)
})



const antiSpam = new Map();
var sm = []
/*
'id' => {
    msgCount: 0,
    lastMessage: 'message',
    timer: fn()
}

*/


function antispam(m) {
    console.log('-> Antispam Checking...')
    if(antiSpam.has(m.author.id)) {
        sm.push(m)
        const userData = antiSpam.get(m.author.id)
        let msgCount = userData.msgCount
        if(parseInt(msgCount) === 5) {
            delspam()
            m.member.timeout(86400000)
            var mutem = m.channel.send(`${m.author} you have been muted for 1 day for spamming.`)
            sm = []
            setTimeout(() => {
                mutem.delete()
            }, 5000)
        }else{
            msgCount++
            userData.msgCount = msgCount
            antiSpam.set(m.author.id, userData)
        }
    }else{
        antiSpam.set(m.author.id, {
            msgCount: 1,
            lastMessage: m,
            timer: null
        })
        setTimeout(() => {
            antiSpam.delete(m.author.id)
        }, 5000)
    }
}









function delspam() {
    for (var i in sm) {
        var message = sm[i]
        console.log('-> AntiSpam: Deleting message ' + message.content)
        message.delete()
    }
}