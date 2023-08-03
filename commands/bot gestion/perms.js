const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "perms",
    aliases: [],
    description: "Permet d'afficher les permissions du bot",
    category: "botcontrol",
    usage: ["perms"],
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

        let perm_ticket = client.db.get(`perm_ticket.${message.guild.id}`)?.filter(role => message.guild.roles.cache.get(role))
        let perm_giveaway = client.db.get(`perm_giveaway.${message.guild.id}`)?.filter(role => message.guild.roles.cache.get(role))
        let perm_1 = client.db.get(`perm1.${message.guild.id}`)?.filter(role => message.guild.roles.cache.get(role))
        let perm_2 = client.db.get(`perm2.${message.guild.id}`)?.filter(role => message.guild.roles.cache.get(role))
        let perm_3 = client.db.get(`perm3.${message.guild.id}`)?.filter(role => message.guild.roles.cache.get(role))
        let perm_4 = client.db.get(`perm4.${message.guild.id}`)?.filter(role => message.guild.roles.cache.get(role))
        let perm_5 = client.db.get(`perm5.${message.guild.id}`)?.filter(role => message.guild.roles.cache.get(role))
        if (!perm_1) perm_1 = []
        if (!perm_2) perm_2 = []
        if (!perm_3) perm_3 = []
        if (!perm_4) perm_4 = []
        if (!perm_5) perm_5 = []
        if (!perm_ticket) perm_ticket = []
        if (!perm_giveaway) perm_giveaway = []
    

        let embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle("Permissions")
        .addField("Permission 1", perm_1.length > 0 ? perm_1.map(r => `<@&${r}>`).join("\n") : "Aucune")
        .addField("Permission 2", perm_2.length > 0 ? perm_2.map(r => `<@&${r}>`).join("\n") : "Aucune")
        .addField("Permission 3", perm_3.length > 0 ? perm_3.map(r => `<@&${r}>`).join("\n") : "Aucune")
        .addField("Permission 4", perm_4.length > 0 ? perm_4.map(r => `<@&${r}>`).join("\n") : "Aucune")
        .addField("Permission 5", perm_5.length > 0 ? perm_5.map(r => `<@&${r}>`).join("\n") : "Aucune")
        .addField("Permission ticket", perm_ticket.length > 0 ? perm_ticket.map(r => `<@&${r}>`).join("\n") : "Aucune")
        .addField("Permission giveaway", perm_giveaway.length > 0 ? perm_giveaway.map(r => `<@&${r}>`).join("\n") : "Aucune")
        .setFooter(footer)


        message.channel.send({embeds : [embed]});

    }
}