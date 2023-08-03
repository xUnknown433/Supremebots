const { Bot } = require('../../structures/client')
const Discord = require('discord.js')
const fs = require('fs')
module.exports = {
    name: 'messageDelete',

    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     */
    run: async (client, message) => {

        if (!message.guild) return;
        
        let channel = client.db.get(`msglogs_${message.guild.id}`)
        if(!channel) return;
        let chan = message.guild.channels.cache.get(channel)
        if(!chan) return;
        let ignored = client.db.get(`msglogs_ignore_${message.channel.id}`)
        if(ignored === true) return;
        
        let action = await guild.fetchAuditLogs({ limit: 1, type: 72 }).then(async (audit) => audit.entries.first());
        let executor = action.executor

        let mwg;
        if (action) mwg = `**Message supprimé par ${executor} dans ${message.channel}**
${message.content}`
        if (!action) mwg = `**Message supprimé dans ${message.channel}**
${message.content}`

        let color = client.db.get(`color_${message.guild.id}`) || client.color

        let Embed = new Discord.MessageEmbed()
        .setColor(color)
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setDescription(mwg)
        .setTimestamp()
        chan.send({ embeds: [Embed] })



    }
}