const { Bot } = require('../../structures/client')
const Discord = require('discord.js')
const fs = require('fs')
const { exec } = require('child_process')
module.exports = {
    name: 'roleCreate',

    /**
     * 
     * @param {Bot} client 
     */
    run: async (client, role) => {
        let guild = role.guild

        let antirole = client.db.get(`antirole.${guild.id}`)
        if(!antirole) return;
        

        let action = await guild.fetchAuditLogs({ limit: 1, type: "ROLE_CREATE" }).then(async (audit) => audit.entries.first());
        let executor = action.executor
        let sanction = await client.db.get(`sanction.antirole.${guild.id}`)
        if (executor.id === client.user.id) return;

        let perm;
        if (antirole === "on") perm = client.config.buyers.includes(executor.id) || client.staff.includes(executor.id) || client.db.get(`owner_${executor.id}`) === true || client.db.get(`wlmd_${guild.id}_${executor.id}`) === true
        if (antirole === "max") perm = client.config.buyers.includes(executor.id) || client.staff.includes(executor.id) || client.db.get(`owner_${executor.id}`) === true

        if (perm) return;

        role.delete({ reason: "antirole" })

        if (!sanction || sanction === "derank") {
            guild.members.cache.get(executor.id).roles.set([])
        } else if (sanction === "kick") {
            guild.members.cache.get(executor.id).kick({ reason: "antirole" })
        } else if (sanction === "ban") {
            guild.members.cache.get(executor.id).ban({ reason: "antirole" })
        }

        let logsEmbed = new Discord.MessageEmbed()
        .setColor(client.db.get(`color.${guild.id}`) || client.color)
        .setTitle(`Antiraid : antirole (${guild.name})`)
        .setDescription(`${executor} a tenté de créer un role nommé \`${role.name}\`
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