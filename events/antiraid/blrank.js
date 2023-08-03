const { Bot } = require('../../structures/client')
const Discord = require('discord.js')
const fs = require('fs')
const { exec } = require('child_process')
module.exports = {
    name: 'guildMemberUpdate',

    /**
     * 
     * @param {Bot} client 
     */
    run: async (client, oldMember, newMember) => {

        let guild = newMember.guild

        const oldRoles = oldMember.roles.cache
        const newRoles = newMember.roles.cache;


        if (oldRoles.size < newRoles.size) {

        let blrank = client.db.get(`blrank.${guild.id}`)
        if(!blrank) return;

        let role = newRoles.find(r => !oldRoles.has(r.id))
        

        let action = await guild.fetchAuditLogs({ limit: 1, type: 25 }).then(async (audit) => audit.entries.first());
        let executor = action.executor
        let sanction = await client.db.get(`sanction.blrank.${guild.id}`)
        if (executor.id === client.user.id) return;
        let perm;
        if (blrank === "on") perm = client.config.buyers.includes(executor.id) || client.staff.includes(executor.id) || client.db.get(`owner_${executor.id}`) === true || client.db.get(`wlmd_${guild.id}_${executor.id}`) === true || executor.id === client.user.id
        if (blrank === "max") perm = client.config.buyers.includes(executor.id) || client.staff.includes(executor.id) || client.db.get(`owner_${executor.id}`) === true || executor.id === client.user.id

        if (perm) return;

        if (client.db.get(`type.blrank.${guild.id}`) === "danger" || !client.db.get(`type.blrank.${guild.id}`)) {
            if(role.permissions.has("KICK_MEMBERS") || role.permissions.has("BAN_MEMBERS") || role.permissions.has("ADMINISTRATOR") || role.permissions.has("MANAGE_CHANNELS") || role.permissions.has("MANAGE_GUILD") || role.permissions.has("MANAGE_ROLES")) {
                newMember.roles.remove(role)
                if (!sanction || sanction === "derank") {
                    guild.members.cache.get(executor.id).roles.set([])
                } else if (sanction === "kick") {
                    guild.members.cache.get(executor.id).kick({ reason: "blrank" })
                } else if (sanction === "ban") {
                    guild.members.cache.get(executor.id).ban({ reason: "blrank" })
                }
        
                let logsEmbed = new Discord.MessageEmbed()
                .setColor(client.db.get(`color.${guild.id}`) || client.color)
                .setTitle(`Antiraid : Blrank (${guild.name})`)
                .setDescription(`${executor} a donné le rôle ${role} à ${newMember} alors qu'il est blrank
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
        } else if (client.db.get(`type.blrank.${guild.id}`) === "all") {
            newMember.roles.remove(role)
            if (!sanction || sanction === "derank") {
                guild.members.cache.get(executor.id).roles.set([])
            } else if (sanction === "kick") {
                guild.members.cache.get(executor.id).kick({ reason: "blrank" })
            } else if (sanction === "ban") {
                guild.members.cache.get(executor.id).ban({ reason: "blrank" })
            }
    
            let logsEmbed = new Discord.MessageEmbed()
            .setColor(client.db.get(`color.${guild.id}`) || client.color)
            .setTitle(`Antiraid : Blrank (${guild.name})`)
            .setDescription(`${executor} a donné le rôle ${role} à ${newMember} alors qu'il est blrank
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
    
    }
}