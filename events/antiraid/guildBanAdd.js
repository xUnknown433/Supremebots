const { Bot } = require('../../structures/client')
const Discord = require('discord.js')
const fs = require('fs')
const { exec } = require('child_process')
module.exports = {
    name: 'guildBanAdd',

    /**
     * 
     * @param {Bot} client 
     */
    run: async (client, ban) => {

        let guild = ban.guild
        let user = ban.user

        let antiban = client.db.get(`antiban.${guild.id}`)
        if(!antiban) return;
        

        let action = await guild.fetchAuditLogs({ limit: 1, type: "MEMBER_BAN_ADD" }).then(async (audit) => audit.entries.first());
        let executor = action.executor
        let sanction = await client.db.get(`sanction.antiban.${guild.id}`)
        if (executor.id === client.user.id) return;

        let perm;
        if (antiban === "on") perm = client.config.buyers.includes(executor.id) || client.staff.includes(executor.id) || client.db.get(`owner_${executor.id}`) === true || client.db.get(`wlmd_${guild.id}_${executor.id}`) === true
        if (antiban === "max") perm = client.config.buyers.includes(executor.id) || client.staff.includes(executor.id) || client.db.get(`owner_${executor.id}`) === true

        if (perm) return;

        guild.members.unban(user, `Antiban`)

        if (!sanction || sanction === "derank") {
            guild.members.cache.get(executor.id).roles.set([])
        } else if (sanction === "kick") {
            guild.members.cache.get(executor.id).kick({ reason: "antiban" })
        } else if (sanction === "ban") {
            guild.members.cache.get(executor.id).ban({ reason: "antiban" })
        }

        let logsEmbed = new Discord.MessageEmbed()
        .setColor(client.db.get(`color.${guild.id}`) || client.color)
        .setTitle(`Antiraid : Antiban (${guild.name})`)
        .setDescription(`${executor} a tenté de bannir \`${user.username}\`
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
        guild.channels.cache.get(client.db.get(`raidlogs_${guild.id}`))?.send({ embeds: [logsEmbed], content: `${pingraid}` })



        

    }
}