const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "adminlist",
    aliases: ["alladmins", "alladmin"], 
    description: "Permet de voir la liste des administrateurs présents sur le serveur",
    usage: ["adminlist"],
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


       let admins = message.guild.members.cache.filter(m => m.permissions.has("ADMINISTRATOR") && !m.user.bot).map(function(b) {return `<@${b.id}>`}).join("\n");
       let count = message.guild.members.cache.filter(m => m.permissions.has("ADMINISTRATOR") && !m.user.bot).size;

       let adminsbot = message.guild.members.cache.filter(m => m.permissions.has("ADMINISTRATOR") && m.user.bot).map(function(b) {return `<@${b.id}>`}).join("\n");
       let countbot = message.guild.members.cache.filter(m => m.permissions.has("ADMINISTRATOR") && m.user.bot).size;


       let embed = new Discord.MessageEmbed()
       .setTitle("Liste des admins")
       .addField(`Humains (${count})`, `${admins}`)
       .addField(`Bots (${countbot})`, `${adminsbot}`)
       .setColor(color)
       .setFooter(`${footer}`);

       message.channel.send({embeds : [embed]}); 
    }
}