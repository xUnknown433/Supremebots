const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "msglogs",
    aliases: ["messagelogs"],
    description: "Permet de gérer les logs de messages",
    category: "logs",
    usage: ["msglogs on [channel]", "msglogs off", "msglogs ignore on [channel]", "msglogs ignore off [channel]"],
    /**
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {Array<>} args 
     * @param {string} commandName 
     */

    run: async (client, message, args, color, prefix, footer, commandName) => {

let pass = false

let staff = client.staff

if(!staff.includes(message.author.id) && !client.config.buyers.includes(message.author.id) && client.db.get(`owner_${message.author.id}`) !== true){
    if(client.db.get(`perm_${commandName}.${message.guild.id}`) === "1" && message.member.roles.cache.some(r => client.db.get(`perm1.${message.guild.id}`)?.includes(r.id))) pass = true;
    if(client.db.get(`perm_${commandName}.${message.guild.id}`) === "2" && message.member.roles.cache.some(r => client.db.get(`perm2.${message.guild.id}`)?.includes(r.id))) pass = true;
    if(client.db.get(`perm_${commandName}.${message.guild.id}`) === "3" && message.member.roles.cache.some(r => client.db.get(`perm3.${message.guild.id}`)?.includes(r.id))) pass = true;
    if(client.db.get(`perm_${commandName}.${message.guild.id}`) === "4" && message.member.roles.cache.some(r => client.db.get(`perm4.${message.guild.id}`)?.includes(r.id))) pass = true;
    if(client.db.get(`perm_${commandName}.${message.guild.id}`) === "5" && message.member.roles.cache.some(r => client.db.get(`perm5.${message.guild.id}`)?.includes(r.id))) pass = true; 
    if(client.db.get(`perm_${commandName}.${message.guild.id}`) === "public") pass = "oui";   
} else pass = true;

if (pass === false) return message.channel.send(`Vous n'avez pas la permission d'utiliser cette commande.`)


        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
        if(!channel) channel = message.channel;

        let logs = client.db.get(`msglogs_${message.guild.id}`)

        if (args[0] === "on") {
            client.db.set(`msglogs_${message.guild.id}`, channel.id)
            message.reply(`Le logs de messages seront désormais envoyés dans ${channel}`)
        }

        if (args[0] === "off") {
            client.db.delete(`msglogs_${message.guild.id}`)
            message.reply(`Les logs de messages sont désormais off`)
        }

        if (args[0] === "ignore" && args[1] === "on") {
            client.db.set(`msglogs_ignore_${channel.id}`, true)
            message.reply(`Les logs de messages dans ${channel} seront désormais ignorés`)
        }

        if (args[0] === "ignore" && args[1] === "off") {
            if (!client.db.get(`msglogs_ignore_${channel.id}`)) return message.reply(`Les logs de messages dans ${channel} ne sont pas ignorés`)
            client.db.delete(`msglogs_ignore_${channel.id}`)
            message.reply(`Les logs de messages dans ${channel} ne seront plus ignorés`)
        }

    }
}