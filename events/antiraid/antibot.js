const { Bot } = require('../../structures/client')
const Discord = require('discord.js')
const fs = require('fs')
const { exec } = require('child_process')
module.exports = {
    name: 'guildMemberAdd',

    /**
     * 
     * @param {Bot} client 
     */
    run: async (client, member) => {
        let guild = member.guild

        if (!member.user.bot) return

        let antibot = client.db.get(`antibot.${guild.id}`)
        if(!antibot) return;

        

        let action = await guild.fetchAuditLogs({ limit: 1, type: "BOT_ADD" }).then(async (audit) => audit.entries.first());
        let executor = action.executor
        let sanction = await client.db.get(`sanction.antibot.${guild.id}`)
        if (executor.id === client.user.id) return;

        let perm;
        if (antibot === "on") perm = client.config.buyers.includes(executor.id) || client.staff.includes(executor.id) || client.db.get(`owner_${executor.id}`) === true || client.db.get(`wlmd_${guild.id}_${executor.id}`) === true
        if (antibot === "max") perm = client.config.buyers.includes(executor.id) || client.staff.includes(executor.id) || client.db.get(`owner_${executor.id}`) === true

        if (perm) return;


        if (!sanction || sanction === "derank") {
            guild.members.cache.get(executor.id).roles.set([])
            member.kick()
        } else if (sanction === "kick") {
            guild.members.cache.get(executor.id).kick({ reason: "antibot" })
            member.kick()
        } else if (sanction === "ban") {
            guild.members.cache.get(executor.id).ban({ reason: "antibot" })
            member.ban()
        }

        let logsEmbed = new Discord.MessageEmbed()
        .setColor(client.db.get(`color.${guild.id}`) || client.color)
        .setTitle(`Antiraid : Antibot (${guild.name})`)
        .setDescription(`${executor} a tenté d'ajouter un bot sur le serveur nommé \`${member.user.tag}\`
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