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
    if (!member) return;

    let blacklist = client.db.get(`blmd_${client.user.id}_${member.id}`)
    if (!blacklist) return;

    member.send(`Vous ne pouvez pas rejoindre le serveur ${guild.name} car vous êtes sur la blacklist.`).then(m => {
    if(blacklist === true) return guild.members.cache.get(member.id)?.ban({reason: `Blacklist`})
    })
 
    }
}
