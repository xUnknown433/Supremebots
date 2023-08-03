const { Bot } = require('../../structures/client')
const Discord = require('discord.js')
const fs = require('fs')
const { exec } = require('child_process')
const ms = require('enhanced-ms')

module.exports = {
    name: 'guildMemberAdd',

    /**
     * 
     * @param {Bot} client 
     * @param {Discord.GuildMember} member
     */
    run: async (client, member) => {
        let guild = member.guild

        let antijoin = client.db.get(`antijoin.${guild.id}`)

        if (member.user.bot) return;

        let perm;
        if (antijoin === "on") perm = client.config.buyers.includes(member.id) || client.staff.includes(member.id) || client.db.get(`owner_${member.id}`) === true || client.db.get(`wlmd_${guild.id}_${member.id}`) === true
        if (antijoin === "max") perm = client.config.buyers.includes(member.id) || client.staff.includes(member.id) || client.db.get(`owner_${member.id}`) === true
        if (!antijoin) return;

        if (perm) return;

        member.kick()


        if (diffbetween <= 0) {
            member.kick()
            let logsEmbed = new Discord.MessageEmbed()
            .setColor(client.db.get(`color.${guild.id}`) || client.color)
            .setTitle(`Antiraid : Antijoin (${guild.name})`)
            .setDescription(`${member.user.tag} a rejoint mais il a été kick car l'antijoin est activé`)
            .setTimestamp()
            .setFooter(client.footer)
            .setAuthor(`${member.user.tag} (${member.user.id})`, member.user.displayAvatarURL())
            let pingraid = client.db.get(`pingraid_${guild.id}`)
            let pingraid_role = client.db.get(`pingraid_role_${guild.id}`)
            if (!pingraid) pingraid = "Aucune mention"
            if (pingraid === "everyone") pingraid = "@everyone"
            if (pingraid === "here") pingraid = "@here"
            if (pingraid === "role") pingraid = `<@&${pingraid_role}>`
            if (pingraid === "buyers") pingraid = `<@${client.config.buyers.join(", ")}>`
            if (pingraid === "owners") pingraid = `${client.db.get(`${client.user.id}.owner`)?.length > 0 ? client.db.get(`${client.user.id}.owner`).map(o => `<@${o}>`).join(", ") : "Aucun owner"}`        
            guild.channels.cache.get(client.db.get(`raidlogs_${guild.id}`))?.send({ embeds: [logsEmbed], content: `${pingraid}` })
    
        }



    }
}