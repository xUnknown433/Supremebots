const { Bot } = require('../../structures/client')
const Discord = require('discord.js')
const fs = require('fs')
const { exec } = require('child_process')
module.exports = {
    name: 'messageCreate',

    /**
     * 
     * @param {Bot} client 
     */
    run: async (client, message) => {
        let guild = message.guild
        if (!guild) return

        let antieveryone = client.db.get(`antieveryone.${guild.id}`)
        if(!antieveryone) return;
        

        let executor = message.author
        let sanction = await client.db.get(`sanction.antieveryone.${guild.id}`)
        if (executor.id === client.user.id) return;


        let perm;
        if (antieveryone === "on") perm = client.config.buyers.includes(executor.id) || client.staff.includes(executor.id) || client.db.get(`owner_${executor.id}`) === true || client.db.get(`wlmd_${guild.id}_${executor.id}`) === true
        if (antieveryone === "max") perm = client.config.buyers.includes(executor.id) || client.staff.includes(executor.id) || client.db.get(`owner_${executor.id}`) === true

        if (perm) return;

        if (!message.member.permissions.has("MENTION_EVERYONE")) return;
        if (message.content !== "@everyone") return;
        if (message.content === "@everyone") {
            message.delete()

        }

        if (!sanction || sanction === "derank") {
            guild.members.cache.get(executor.id).roles.set([])
        } else if (sanction === "kick") {
            guild.members.cache.get(executor.id).kick({ reason: "antieveryone" })
        } else if (sanction === "ban") {
            guild.members.cache.get(executor.id).ban({ reason: "antieveryone" })
        }

        let logsEmbed = new Discord.MessageEmbed()
        .setColor(client.db.get(`color.${guild.id}`) || client.color)
        .setTitle(`Antiraid : Antieveryone (${guild.name})`)
        .setDescription(`${executor} a tenté d'envoyer un message contenant @everyone.
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