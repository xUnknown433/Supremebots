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

    guild.roles.cache.forEach(rolez => {
        if (client.db.get(`joinrole_${guild.id}_${rolez.id}`) === true) {
            member.roles.add(rolez)
        }
    })
 
    }
}