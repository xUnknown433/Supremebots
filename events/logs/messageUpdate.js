const { Bot } = require('../../structures/client')
const Discord = require('discord.js')
const fs = require('fs')
module.exports = {
    name: 'messageUpdate',

    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     */
    run: async (client, oldMessage, newMessage) => {

        let message = newMessage
        if (!message.guild) return;
        
        let channel = client.db.get(`msglogs_${message.guild.id}`)
        if(!channel) return;
        let chan = message.guild.channels.cache.get(channel)
        if(!chan) return;
        let ignored = client.db.get(`msglogs_ignore_${message.channel.id}`)
        if(ignored === true) return;
        
        let color = client.db.get(`color_${message.guild.id}`) || client.color

        let Embed = new Discord.MessageEmbed()
        .setColor(color)
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setDescription(`**Message modifié dans ${message.channel}**`)
        .addField(`**Ancien message**`, `${oldMessage.content}`)
        .addField(`**Nouveau message**`, `${newMessage.content}`)
        .setTimestamp()
        chan.send({ embeds: [Embed] })



    }
}