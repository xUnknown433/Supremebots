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
    if (!guild) return;

    let joindm = client.db.get(`joindm_${guild.id}`)
    if (!joindm) return;

    member.send(`${joindm}`)
 
    }
}