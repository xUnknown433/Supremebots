const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "dnd",
    aliases: [],
    description: "Permet de changer la présence du bot",
    category: "botcontrol",
    usage: ["dnd"],
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


        client.db.set(`isActivityOn`, "dnd")

        message.reply(`Je suis désormais en ne pas déranger`)
        client.user.setPresence({ status: 'dnd' })
    
    }
}