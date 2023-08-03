const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const request = require('request');
const fs = require('fs');

module.exports = {
    name: "pingraid",
    aliases: [],
    description: "Permet de paraméter le pingraid",
    category: "antiraid",
    usage: ["pingraid off", "pingraid everyone/here/buyers/owners", "pingraid role <role>"],
    
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

    if (args[0] === "off") {
        if (!client.db.get(`pingraid_${message.guild.id}`)) return message.channel.send(`Le pingraid est déjà désactivé.`)
        client.db.delete(`pingraid_${message.guild.id}`);
        message.channel.send(`Le pingraid est désormais désactivé.`)
    } else if (args[0] === "everyone" || args[0] === "here" || args[0] === "buyers" || args[0] === "owners") {
        if (client.db.get(`pingraid_${message.guild.id}`) === args[0]) return message.channel.send(`Le pingraid est déjà sur ${args[0]}.`)
        client.db.set(`pingraid_${message.guild.id}`, args[0]);
        message.channel.send(`Le pingraid est désormais activé sur ${args[0]}.`)
    } else if (args[0] === "role") {
        let role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name === args[1]) || message.guild.roles.cache.find(r => r.id === args[1]);
        if (!role) return message.channel.send(`Le rôle n'existe pas.`)
        if (client.db.get(`pingraid_${message.guild.id}`) === "role") return message.channel.send(`Le pingraid est déjà activé.`)
        client.db.set(`pingraid_${message.guild.id}`, "role");
        client.db.set(`pingraid_role_${message.guild.id}`, role.id);
        message.channel.send(`Le pingraid est désormais activé sur le rôle ${role.name}.`)
    } 

   

}
}