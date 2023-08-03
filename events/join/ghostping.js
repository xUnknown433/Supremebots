const { Bot } = require('../../structures/client')
const Discord = require('discord.js')
const fs = require('fs')
module.exports = {
    name: 'guildMemberAdd',

    /**
     * 
     * @param {Bot} client 
     * @param {Discord.GuildMember} member
     */
    run: async (client, member) => {
       
    let guild = member.guild

    guild.channels.cache.forEach(channel => {
        if (client.db.get(`ghostjoin_${channel.id}`) === true) {
            channel.send(`${member}`).then(msg => {
                msg.delete({ timeout: 1000 })
            })
        }
    })
 
    }
}