const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const request = require('request');
const fs = require('fs');

module.exports = {
    name: "antilink",
    aliases: [],
    description: "Permet de paraméter l'antilink",
    category: "antiraid",
    usage: ["antilink <on/off/max", "antilink ignore <on/off>"],
    
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

    if (args[0] === "on") {
        if (client.db.get(`antilink.${message.guild.id}`) === "on") return message.channel.send(`L'antilink est déjà activé.`)
        client.db.set(`antilink.${message.guild.id}`, "on");
        message.channel.send(`L'antilink est désormais activé.`)
    }

    if (args[0] === "off") {
        if (!client.db.get(`antilink.${message.guild.id}`)) return message.channel.send(`L'antilink est déjà désactivé.`)
        client.db.delete(`antilink.${message.guild.id}`);
        message.channel.send(`L'antilink est désormais désactivé.`)
    }

    if (args[0] === "max") {
        if (client.db.get(`antilink.${message.guild.id}`) === "max") return message.channel.send(`L'antilink est déjà au maximum.`)
        client.db.set(`antilink.${message.guild.id}`, "max");
        message.channel.send(`L'antilink est désormais au maximum.`)
    }

    if (args[0] === "ignore" && args[1] === "on") {
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]) || message.channel;
        if (client.db.get(`antilink.ignore.${message.guild.id}.${channel.id}`) === true) return message.channel.send(`L'antilink est déjà ignoré sur ce channel.`)
        client.db.set(`antilink.ignore.${message.guild.id}.${channel.id}`, true);
        message.channel.send(`L'antilink est désormais ignoré dans ce channel.`)
    }

    if (args[0] === "ignore" && args[1] === "off") {
        if (!client.db.get(`antilink.ignore.${message.guild.id}.${channel.id}`)) return message.channel.send(`L'antilink est déjà désactivé sur ce channel.`)
        client.db.delete(`antilink.ignore.${message.guild.id}.${channel.id}`);
        message.channel.send(`L'antilink est désormais désactivé dans ce channel.`)
    }

    if (args[0] === "type" && args[1] === "all") {
        if (client.db.get(`antilink.type.${message.guild.id}`) === "all") return message.channel.send(`L'antilink est déjà sur \`all\`.`)
        client.db.set(`antilink.type.${message.guild.id}`, "all");
        message.channel.send(`L'antilink est désormais sur \`all\`.`)
    }

    if (args[0] === "type" && args[1] === "invites") {
        if (client.db.get(`antilink.type.${message.guild.id}`) === "invites") return message.channel.send(`L'antilink est déjà sur \`invites\`.`)
        client.db.set(`antilink.type.${message.guild.id}`, "invites");
        message.channel.send(`L'antilink est désormais sur \`invites\`.`)
    }

}
}