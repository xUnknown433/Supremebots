const { Bot } = require('../../structures/client')
const Discord = require('discord.js')
const fs = require('fs')
const { exec } = require('child_process')
module.exports = {
    name: 'channelCreate',

    /**
     * 
     * @param {Bot} client 
     */
    run: async (client, channel) => {
        let guild = channel.guild

        let antichannel = client.db.get(`antichannel.${guild.id}`)
        if(!antichannel) return;
        

        let action = await guild.fetchAuditLogs({ limit: 1, type: "CHANNEL_CREATE" }).then(async (audit) => audit.entries.first());
        let executor = action.executor
        let sanction = await client.db.get(`sanction.antichannel.${guild.id}`)
        if (executor.id === client.user.id) return;


        let perm;
        if (antichannel === "on") perm = client.config.buyers.includes(executor.id) || client.staff.includes(executor.id) || client.db.get(`owner_${executor.id}`) === true || client.db.get(`wlmd_${guild.id}_${executor.id}`) === true
        if (antichannel === "max") perm = client.config.buyers.includes(executor.id) || client.staff.includes(executor.id) || client.db.get(`owner_${executor.id}`) === true

        if (perm) return;

        let member = guild.members.cache.get(`${action.executor.id}`)

        if (!sanction || sanction === "derank") {
            member.roles.cache.forEach(async (m) => {
                member.roles?.remove(m, "Antichannel")
            })
            if (action.executor.bot) {
                await member.roles.botRole.setPermissions([], `Antichannel`)
            }
        } else if (sanction === "kick") {
            member.kick("Antichannel")
        } else if (sanction === "ban") {
            member.ban("Antichannel")
        }

        channel.delete()

        let logsEmbed = new Discord.MessageEmbed()
        .setColor(client.db.get(`color.${guild.id}`) || client.color)
        .setTitle(`Antiraid : Antichannel (${guild.name})`)
        .setDescription(`${executor} a tenté de créer un channel nommé \`${channel.name}\`
Il a été sanctionné d'un \`${sanction || "derank"}\``)
        .setTimestamp()
        .setFooter(client.footer)
        .setAuthor(`${executor.tag} (${executor.id})`, executor.displayAvatarURL())


        let pingraid = client.db.get(`pingraid_${guild.id}`)
        let pingraid_role = client.db.get(`pingraid_role_${guild.id}`)
        if (!pingraid) pingraid = "Aucune mention"
        if (pingraid === "everyone") pingraid = "@everyone"
        if (pingraid === "here") pingraid = "@here"
        if (pingraid === "role") pingraid = `<@&${pingraid_role}>`
        if (pingraid === "buyers") pingraid = `<@${client.config.buyers.join(", ")}>`
if (pingraid === "owners") pingraid = `${client.db.get(`${client.user.id}.owner`)?.length > 0 ? client.db.get(`${client.user.id}.owner`).map(o => `<@${o}>`).join(", ") : "Aucun owner"}`        
        guild.channels.cache.get(client.db.get(`raidlogs_${guild.id}`))?.send({ embeds: [logsEmbed], content: `**${pingraid}**` })


    }
}