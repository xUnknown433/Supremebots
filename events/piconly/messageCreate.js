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


        let channel = message.channel

        if (channel.type === "dm") return;

        let pic_only = client.db.get(`photo_${channel.id}`)
        if (pic_only === true) {
            if (message.attachments.size === 0) {
                message.delete()
            } 
        } 

    }
}