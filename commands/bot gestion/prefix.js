const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const request = require('request');
const fs = require('fs');

module.exports = {
    name: "prefix",
    aliases: [],
    description: "Permet de changer le prefix du bot sur le serveur",
    category: "botcontrol",
    usage: ["prefix"],
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

        let preiks = args[0] 
        if (!preiks) return;


        if (preiks !== "reset") {
        let current_prefix = client.db.get(`prefix_${message.guild.id}`) || client.prefix

        if(preiks === current_prefix) return message.channel.send(`Le prefix de ce serveur est déjà \`${current_prefix}\``)

        client.db.set(`prefix_${message.guild.id}`, preiks)
        message.channel.send(`Le prefix de ce serveur est désormais \`${preiks}\``)

        } else

        if (preiks === "reset") {
            client.db.delete(`prefix_${message.guild.id}`)
            message.channel.send(`Le prefix de ce serveur est désormais \`${client.prefix}\``)
        }

}
}