const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "owner",
    aliases: [],
    description: "Permet d'ajouter une personne au rang d'owner",
    category: "buyers",
    usage: ["owner <utilisateur>"],

    /**
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {Array<>} args 
     * @param {string} commandName 
     */

    run: async (client, message, args, color, prefix, footer, commandName) => {

        if(!client.config.buyers.includes(message.author.id)) return message.channel.send(`Vous n'avez pas la permission d'utiliser cette commande.`)

    if (message.mentions.members.size > 0 || client.users.cache.get(args[0])) {

        let member = message.mentions.members.first()

        if (client.db.get(`owner_${member.id}`) === true) return message.channel.send(`${member.user.username} est déjà owner`)
        client.db.push(`${client.user.id}.owner`, member.id)
        client.db.set(`owner_${member.id}`, true)
        message.channel.send(`${member.user.username} est désormais owner`)

    }


    }
}