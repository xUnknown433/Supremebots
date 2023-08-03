
const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const request = require('request');

module.exports = {
    name: "pic",
    aliases: [],
    description: "Permet de voir la pp d'un utilisateur ",
    category: "utilitaire" ,
    usage: ["pic [utilisateur]"],
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

       let user = message.mentions.users.first() || args[0] || message.author;
       let user_pic = user.displayAvatarURL({dynamic: true, size: 2048});

       if (!user_pic) return message.channel.send(user.id === message.author.id ? `Vous n'avez pas de photo de profil.` : `Cet utilisateur n'a pas de photo de profil.`)

       let Embed = new Discord.MessageEmbed()
         .setColor(color)
         .setTitle(`${user.username}`)
         .setImage(user_pic)
         .setFooter(footer)

         message.channel.send({ embeds: [Embed] });

    }
}