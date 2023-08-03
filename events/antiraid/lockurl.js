const { Bot } = require('../../structures/client')
const fetch = require('node-fetch')
const Discord = require('discord.js')


module.exports = {
    name: 'guildUpdate',

    /**
     * 
     * @param {Bot} client 
     */
    run: async (client, oldGuild, newGuild) => {

    let lockurl_vanity = client.db.get(`lockurl_vanity_${newGuild.id}`)
    let lockurl = client.db.get(`lockurl.${newGuild.id}`)
    let guild = newGuild
    if (!lockurl) return;
    if (!lockurl_vanity) return;

    let action = await guild.fetchAuditLogs({ limit: 1, type: "GUILD_UPDATE" }).then(async (audit) => audit.entries.first());
    let executor = action.executor
    let sanction = await client.db.get(`sanction.lockurl.${guild.id}`)
    if (executor.id === client.user.id) return;

    let perm;
    if (lockurl === "on") perm = client.config.buyers.includes(executor.id) || client.staff.includes(executor.id) || client.db.get(`owner_${executor.id}`) === true || client.db.get(`wlmd_${guild.id}_${executor.id}`) === true
    if (lockurl === "max") perm = client.config.buyers.includes(executor.id) || client.staff.includes(executor.id) || client.db.get(`owner_${executor.id}`) === true

    if (perm) return;


    if (newGuild.vanityURLCode === lockurl_vanity) return
    if (newGuild.vanityURLCode !== lockurl_vanity) {
        return await fetch(`https://discord.com/api/v9/guilds/${newGuild.id}/vanity-url`, {
            "credentials": "include",
            "headers": {
                "accept": "*/*",
                "authorization": "Bot " + client.config.token,
                "content-type": "application/json",
            },
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": JSON.stringify({
                "code": lockurl_vanity
            }),
            "method": "PATCH",
            "mode": "cors"
        }).then(response => {
            if (response.ok) {
                if (!sanction || sanction === "derank") {
                    guild.members.cache.get(executor.id).roles.set([])
                } else if (sanction === "kick") {
                    guild.members.cache.get(executor.id).kick({ reason: "lockurl" })
                } else if (sanction === "ban") {
                    guild.members.cache.get(executor.id).ban({ reason: "lockurl" })
                }
            
                let logsEmbed = new Discord.MessageEmbed()
                .setColor(client.db.get(`color.${guild.id}`) || client.color)
                .setTitle(`Antiraid : Lockurl (${guild.name})`)
                .setDescription(`${executor} a tenté de changer l'url du serveur en : \`discord.gg/${newGuild.vanityURLCode}\`
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
            
            } else {
                if (!sanction || sanction === "derank") {
                    guild.members.cache.get(executor.id).roles.set([])
                } else if (sanction === "kick") {
                    guild.members.cache.get(executor.id).kick({ reason: "lockurl" })
                } else if (sanction === "ban") {
                    guild.members.cache.get(executor.id).ban({ reason: "lockurl" })
                }
            
                let logsEmbed = new Discord.MessageEmbed()
                .setColor(client.db.get(`color.${guild.id}`) || client.color)
                .setTitle(`Antiraid : Lockurl (${guild.name})`)
                .setDescription(`${executor} a tenté de changer l'url du serveur en : \`discord.gg/${newGuild.vanityURLCode}\`
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
        })
    }


        
    }
}