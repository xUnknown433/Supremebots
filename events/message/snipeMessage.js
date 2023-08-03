const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "messageDelete",

    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     */

    run: async(client, message) => {
        client.snipe.set(message.channel.id, {
            msg: message.content, 
            author: message.author
        })
    }
}