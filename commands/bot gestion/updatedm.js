const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const request = require('request');

module.exports = {
    name: "updatedm",
    aliases: [],
    description: "Permet de gérer le updatedm",
    category: "botcontrol",
    usage: ["updatedm on/off"],
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
        if(client.db.get(`updatedm`) === true) return message.channel.send(`Le updatedm est déjà activé.`)
        client.db.set(`updatedm`, true);
        message.channel.send(`Le updatedm est maintenant activé.`);
    }

    if (args[0] === "off") {
        if(!client.db.get(`updatedm`)) return message.channel.send(`Le updatedm est déjà désactivé.`)
        client.db.delete(`updatedm`);
        message.channel.send(`Le updatedm est maintenant désactivé.`);
    }



    }
}