const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const ms = require('enhanced-ms')
module.exports = {
    name: "sanctions",
    aliases: [],
    description: "Permet de voir les sanctions de l'utilisateur mentionné",
    category: "moderation",
    usage: ["sanctions <utilisateur>"],

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

        let user = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
        
        let sanctions = client.db.get(`sanctions_${message.guild.id}`) || [];

        let Embed = new Discord.MessageEmbed()
        .setColor(color)
        .setFooter(footer)
        .setTitle(`Sanctions de ${user.user.username}`)
        .setDescription(sanctions.filter(s => s.user === user.user.id).map((sanction, i) => `**${i+1}**)
**ID :** \`${sanction._id}\`
**Type :** \`${sanction.type}\`
**Raison :** \`${sanction.raison}\`
**Date :** \`${sanction.date}\`
**Auteur :** \`${client.users.cache.get(sanction.mod).tag}\``).join('\n'))

        message.channel.send({ embeds: [Embed] })




    }
}