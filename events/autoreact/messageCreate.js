const { Bot } = require('../../structures/client')
const Discord = require('discord.js')
const fs = require('fs')
module.exports = {
    name: 'messageCreate',

    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     */
    run: async (client, message) => {

        if (!message.guild) return;


        let autoreact = client.db.get(`autoreact_${message.guild.id}`)
        if (!autoreact || autoreact.length === 0) return;

        let autoreact_ = autoreact.filter(r => r.channel === message.channel.id)
        if (autoreact_.length === 0) return;

        let autoreact_emoji = autoreact_.map(r => r.emoji)
        
        autoreact_emoji.forEach(async (emoji) => {
            await message.react(emoji)
        })



    }
}