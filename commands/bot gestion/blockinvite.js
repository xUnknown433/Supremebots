const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const request = require('request');

module.exports = {
    name: "blockinvite",
    aliases: [],
    description: "Permet de gérer le blockinvite",
    category: "botcontrol",
    usage: ["blockinvite on/off"],
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
        if(client.db.get(`blockinvite`) === true) return message.channel.send(`Le blockinvite est déjà activé.`)
        client.db.set(`blockinvite`, true);
        message.channel.send(`Le blockinvite est maintenant activé.`);
    }

    if (args[0] === "off") {
        if(!client.db.get(`blockinvite`)) return message.channel.send(`Le blockinvite est déjà désactivé.`)
        client.db.delete(`blockinvite`);
        message.channel.send(`Le blockinvite est maintenant désactivé.`);
    }

    if (args[0] === "max") {
        if(client.db.get(`blockinvite`) === "max") return message.channel.send(`Le blockinvite est déjà à la limite.`)
        client.db.set(`blockinvite`, "max");
        message.channel.send(`Le blockinvite est maintenant au maximum.`);
    }
 


    }
}