const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "unowner",
    aliases: [],
    description: "Permet d'enlever un owner",
    category: "buyers",
    usage: ["unowner <utilisateur>"],

    /**
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {Array<>} args 
     * @param {string} commandName 
     */

    run: async (client, message, args, color, prefix, footer, commandName) => {

        if(!client.config.buyers.includes(message.author.id)) return message.channel.send(`Vous n'avez pas la permission d'utiliser cette commande.`)



if (message.mentions.members.size > 0) {

    let member = message.mentions.members.first()
    client.db.delete(`owner_${member.user.id}`)
    if (client.db.get(`${client.user.id}.owner`)?.filter(m => m !== member.user.id).length === 0) { 
    client.db.delete(`${client.user.id}.owner`)
    message.channel.send(`${member.user.username} n'est plus owner`)
    return console.log(`Bête irl`)
    }

    if(client.db.get(`${client.user.id}.owner`)?.filter(m => m !== member.user.id).length > 0) {

    client.db.set(`${client.user.id}.owner`, client.db.get(`${client.user.id}.owner`)?.filter(m => m !== member.user.id))
    message.channel.send(`${member.user.username} n'est plus owner`)
    return console.log(`Smart irl`)

    }
}

    }
}