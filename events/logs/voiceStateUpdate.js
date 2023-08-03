const { Bot } = require('../../structures/client')
const Discord = require('discord.js')
const fs = require('fs')
module.exports = {
    name: 'voiceStateUpdate',

    /**
     * 
     * @param {Bot} client 
     */
    run: async (client, oldMember, newMember) => {

        let guild = newMember.guild
        if (!guild) return;

        let channel = client.db.get(`voicelogs_${guild.id}`)
        if(!channel) return;
        let chan = guild.channels.cache.get(channel)
        if(!chan) return;
        
        let color = client.db.get(`color_${guild.id}`) || client.color

        let userStat;

        let user = newMember.guild.members.cache.get(newMember.id)
        let newchan = newMember.guild.channels.cache.get(newMember.channelId)
        let oldchan = oldMember.guild.channels.cache.get(oldMember.channelId)

        
        
        if(oldMember.channelId === null && newMember.channelId !== null) {
            userStat = `${user} a rejoint le salon ${newchan}`
        }

        if(oldMember.channelId !== null && newMember.channelId === null) {
            userStat = `${user} a quitté le salon ${oldchan}`
        }

        if(oldMember.channelId !== null && newMember.channelId !== null) {
            userStat = `${user} a quitté le salon ${oldchan} et a rejoint le salon ${newchan}`
        }

        let Embed = new Discord.MessageEmbed()
        .setColor(color)
        .setAuthor(`${user.user.tag}`, user.displayAvatarURL())
        .setDescription(`${userStat}`)
        .setTimestamp()
        chan.send({ embeds: [Embed] })
        

    }
}