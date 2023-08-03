const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "lrm",
    aliases: ["rolemembers",], 
    description: "Permet de voir les membres d'un rôle",
    category: "utilitaire" ,
    usage: ["lrm <role>"],

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


       let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(r => r.name === args[0]) || message.guild.roles.cache.find(r => r.id === args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args[0].toLowerCase()) || message.guild.roles.cache.find(r => r.id.toLowerCase() === args[0].toLowerCase())
       if (!role) return;
       let members = role.members.map(m=>m.user).join("\n");
       let count = role.members.size;

       let embed = new Discord.MessageEmbed()
       .setTitle("Liste des membres du rôle")
       .setDescription(`**Il y a ${count} personnes possédant le rôle ${role}**\n\n${members}`)
       .setColor(color)
       .setFooter(`${footer}`);

       message.channel.send({embeds : [embed]}); 
    }
}