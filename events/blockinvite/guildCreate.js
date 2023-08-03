const { Bot } = require('../../structures/client')
const randomstring = require('randomstring')
const fs = require('fs')
const Discord = require('discord.js')
const request = require('request')
const ms = require("enhanced-ms")

module.exports = {
    name: 'guildCreate',

    /**
     * 
     * @param {Bot} client 
     */
    run: async (client, guild) => {
       
        let owners = client.db.get(`${client.user.id}.owner`)
        let buyers = client.config.buyers

        let blockinvite = client.db.get(`blockinvite`)


        if (!owners) owners = []
        if (!buyers) buyers = []

        let action = await guild.fetchAuditLogs({ limit: 1, type: "BOT_ADD" }).then(async (audit) => audit.entries.first());
        let executor = action.executor

    
        if (blockinvite === true) {
            let canjoin = false;
            guild.members.cache.forEach(async (member) => {
                if (client.db.get(`owner_${executor.id}`) === true) canjoin = true;
                if (client.config.buyers.includes(member.id)) canjoin = true;

                if (canjoin === false) return guild.leave();
            })

        } else if (blockinvite === "max") {
            let canjoin = false;
            if (client.db.get(`owner_${executor.id}`) === true) canjoin = true;
            if (client.config.buyers.includes(executor.id)) canjoin = true;

            if (canjoin === false) return guild.leave();

        } else if (!blockinvite) {
            let canjoin = true;
        }


    }
}