const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const request = require('request');
const fs = require('fs');

module.exports = {
    name: "change",
    aliases: [],
    description: "Permet de changer la permission d'une commande",
    category: "proprio",
    usage: ["change <commande> <permission>", "change remove <commande>", "change reset"],

    /**
     * @param {bot} client  
     * @param {Discord.Message} message 
     * @param {Array<>} args 
     * @param {string} commandName 
     */

    run: async (client, message, args, color, prefix, footer, commandName) => {


        if(!client.config.buyers.includes(message.author.id)) return message.channel.send(`Vous n'avez pas la permission d'utiliser cette commande.`)
        let perms = ["1", "2", "3", "4", "5", "public"]

        if (args[0] === "remove") {
            let cmd = client.commands.get(args[1]) || client.commands.get(client.aliases.get(args[1]))

            client.db.delete(`perm_${cmd.name}.${message.guild.id}`)
            message.channel.send(`La commande \`${cmd.name}\` n'est plus assigné a aucune commande`)
        } else if (args[0] === "reset") {
            client.commands.forEach(async (m) => {
                client.db.delete(`perm_${m.name}.${message.guild.id}`)
            })

            message.channel.send(`Les permissions des commandes ont été **reset**`)
        } else if (args[0] !== "reset" && args[0] !== "remove"){

        let cmd = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]))
        let perm = args[1]

        if (!cmd) return;
        if (!perms.includes(perm)) return message.channel.send(`Permission invalide, les permissions sont : \`${perms.join("`, `")}\``)

        client.db.set(`perm_${cmd.name}.${message.guild.id}`, perm)
        message.channel.send(`La commande \`${cmd.name}\` a été assignée à la permission \`perm ${perm}\``)

    }



}
}