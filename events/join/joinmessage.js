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

    let joinmessage = client.db.get(`joinmessage_${guild.id}`).replace("{user.username}", member.user.username).replace("{user.username}", member.user.username).replace("{user.username}", member.user.username).replace("{user.username}", member.user.username).replace("{user.tag}", member.user.tag).replace("{user.tag}", member.user.tag).replace("{user.tag}", member.user.tag).replace("{user.tag}", member.user.tag).replace("{user.id}", member.user.id).replace("{user.id}", member.user.id).replace("{user.id}", member.user.id).replace("{user.id}", member.user.id).replace("{user.mention}", member.user).replace("{user.mention}", member.user).replace("{user.mention}", member.user).replace("{user.mention}", member.user).replace("{guild.name}", member.guild.name).replace("{guild.name}", member.guild.name).replace("{guild.name}", member.guild.name).replace("{guild.name}", member.guild.name).replace("{guild.memberCount}", member.guild.memberCount).replace("{guild.memberCount}", member.guild.memberCount).replace("{guild.memberCount}", member.guild.memberCount).replace("{guild.memberCount}", member.guild.memberCount).replace("{vanity.usesCount}", member.guild.vanityURLUses || 0).replace("{vanity.usesCount}", member.guild.vanityURLUses || 0).replace("{vanity.usesCount}", member.guild.vanityURLUses || 0).replace("{vanity.usesCount}", member.guild.vanityURLUses || 0).replace("{vanity.usesCount}", member.guild.vanityURLUses || 0).replace("{vanity.usesCount}", member.guild.vanityURLUses || 0).replace("{vanity.Url}", member.guild.vanityURLCode || "none").replace("{vanity.Url}", member.guild.vanityURLCode || "none").replace("{vanity.Url}", member.guild.vanityURLCode || "none").replace("{vanity.Url}", member.guild.vanityURLCode || "none").replace("{vanity.Url}", member.guild.vanityURLCode || "none").replace("{vanity.Url}", member.guild.vanityURLCode || "none")
    let joinchannel = guild.channels.cache.get(client.db.get(`joinchannel_${guild.id}`))
    if (!joinmessage) return;
    if (!joinchannel) return

    joinchannel.send(`${joinmessage}`)
 
    }
}