const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "perm",
    aliases: [],
    description: "Permet de configurer les permissions du bot",
    category: "botcontrol",
    usage: ["perm <permission> add <role>", "perm <permission> remove <role>"],

    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {Array<>} args 
     * @param {*} color 
     * @param {*} prefix 
     * @param {*} footer 
     * @param {string} commandName 
     */
    run: async(client, message, args, color, prefix, footer, commandName) => {

        if(!client.config.buyers.includes(message.author.id)) return message.channel.send(`Vous n'avez pas la permission d'utiliser cette commande.`)

        let perm_ticket = client.db.get(`perm_ticket.${message.guild.id}`)
        let perm_giveaway = client.db.get(`perm_giveaway.${message.guild.id}`)
        let perm_1 = client.db.get(`perm1.${message.guild.id}`)
        let perm_2 = client.db.get(`perm2.${message.guild.id}`)
        let perm_3 = client.db.get(`perm3.${message.guild.id}`)
        let perm_4 = client.db.get(`perm4.${message.guild.id}`)
        let perm_5 = client.db.get(`perm5.${message.guild.id}`)

        let valid_perms = ["perm1", "perm2", "perm3", "perm4", "perm5", "perm_ticket", "perm_gw"]
        let perm_to_edit = args[0]
        let action = args[1]
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])

        if(!valid_perms.includes(perm_to_edit)) return message.channel.send(`Permission invalide.`)
        if(!role) return message.channel.send(`Rôle invalide.`)

        if (action === "add") {
            let permzz = client.db.get(`${perm_to_edit}.${message.guild.id}`)
            if(permzz?.filter(r => r === role.id).length > 0) return message.channel.send(`Le rôle ${role.name} est déjà dans la permission ${perm_to_edit}.`)
            client.db.push(`${perm_to_edit}.${message.guild.id}`, role.id)
            message.channel.send(`Le rôle a bien été ajouté à la permission.`)
        }

        if (action === "remove") {
            let permzz = client.db.get(`${perm_to_edit}.${message.guild.id}`)
            if(permzz?.filter(r => r === role.id).length === 0) return message.channel.send(`Le rôle ${role.name} n'est pas dans la permission ${perm_to_edit}.`)
            client.db.set(`${perm_to_edit}.${message.guild.id}`, permzz.filter(r => r !== role.id))
            message.channel.send(`Le rôle a bien été retiré de la permission.`)
        }

    }
}