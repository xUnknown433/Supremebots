const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "boosters",
    aliases: [],
    description: "Permet de voir les boosters du serveur",
    category: "utilitaire" ,
    usage: ["boosters"],


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


       let boosters = message.guild.members.cache.filter(m => m.premiumSince)?.map(function(m) {return `<@${m.id}> boost depuis : <t:${parseInt(m.premiumSinceTimestamp / 1000)}:f>`}).join("\n");
       if(!boosters || boosters.length < 1) boosters = "Personne n'est en train de booster le serveur";

       let embed = new Discord.MessageEmbed()
       .setTitle("Boosters")
       .setDescription(`**Il y a ${message.guild.members.cache.filter(m => m.premiumSince).size} boosters**\n\n${boosters}`)
       .setColor(color)
       .setFooter(`${footer}`); 

        message.channel.send({embeds : [embed]}); 
    }
}