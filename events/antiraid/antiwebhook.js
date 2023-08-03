const { Bot } = require('../../structures/client')
const fetch = require('node-fetch')
const Discord = require('discord.js')


module.exports = {
    name: 'webhookUpdate',

    /**
     * 
     * @param {Bot} client 
     */
    run: async (client, channel) => {
    let guild = channel.guild
    let antiwebhook = client.db.get(`antiwebhook.${guild.id}`)

    if (!antiwebhook) return;

    let modeaction;
    if (client.db.get(`antiwebhook_action_${guild.id}`) === "renew") modeaction = "renew"
    if (!client.db.get(`antiwebhook_action_${guild.id}`)) modeaction = "delete"
    


    let action = await guild.fetchAuditLogs({ limit: 1, type: "WEBHOOK_CREATE" }).then(async (audit) => audit.entries.first());
    let executor = action.executor
    let sanction = await client.db.get(`sanction.antiwebhook.${guild.id}`)
    if (executor.id === client.user.id) return;

    let perm;
    if (antiwebhook === "on") perm = client.config.buyers.includes(executor.id) || client.staff.includes(executor.id) || client.db.get(`owner_${executor.id}`) === true || client.db.get(`wlmd_${guild.id}_${executor.id}`) === true
    if (antiwebhook === "max") perm = client.config.buyers.includes(executor.id) || client.staff.includes(executor.id) || client.db.get(`owner_${executor.id}`) === true

    if (perm) return;

    if (modeaction === "delete") {
      const hooks = guild.fetchWebhooks().then(webhooks => {
        webhooks.forEach(webhook => {
            webhook.delete()
        })
    })
    } else if (modeaction === "renew") {
        await channel.clone({
                name: channel.name,
                permissions: channel.permissionsOverwrites,
                type: channel.type,
                topic: channel.withTopic,
                nsfw: channel.nsfw,
                birate: channel.bitrate,
                userLimit: channel.userLimit,
                rateLimitPerUser: channel.rateLimitPerUser,
                permissions: channel.withPermissions,
                position: channel.rawPosition,
                reason:  `Antiwebhook - renew`
            }).then(x => {
                channel.delete({reason:  `Antiwebhook - renew`})
            })
    }

    if (!sanction || sanction === "derank") {
        guild.members.cache.get(executor.id).roles.set([])
    } else if (sanction === "kick") {
        guild.members.cache.get(executor.id).kick({ reason: "antiwebhook" })
    } else if (sanction === "ban") {
        guild.members.cache.get(executor.id).ban({ reason: "antiwebhook" })
    }

    let logsEmbed = new Discord.MessageEmbed()
    .setColor(client.db.get(`color.${guild.id}`) || client.color)
    .setTitle(`Antiraid : Antiwebhook (${guild.name})`)
    .setDescription(`${executor} a créer un webhook
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