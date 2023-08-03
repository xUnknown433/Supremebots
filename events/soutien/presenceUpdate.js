const { Bot } = require('../../structures/client')
const Discord = require('discord.js')
const fs = require('fs')
module.exports = {
    name: 'presenceUpdate',

    /**
     * 
     * @param {Bot} client 
     */
    run: async (client, oldPresence, newPresence) => {

        let member = newPresence.member

        let soutien = client.db.get(`soutien_${newPresence.guild.id}`)
        if (!soutien) soutien = []
        soutien.map(async (soutien) => {
            let texte = soutien.texte
            if (newPresence.activities[0] && newPresence.activities[0].state?.includes(texte)) {
                let role = newPresence.guild.roles.cache.get(soutien.role)
                if (role) {
                    if (!member.roles.cache.has(role.id)) {
                        await member.roles.add(role)
                    }
                }
            } else {
                let role = newPresence.guild.roles.cache.get(soutien.role)
                if (role) {
                    if (member.roles.cache.has(role.id)) {
                        await member.roles.remove(role)
                    }
                }
            }

        })
        
    }
}