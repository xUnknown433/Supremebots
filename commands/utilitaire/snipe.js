const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "snipe",
    aliases: ["snipe"], 
    description: "Permet de voir le dernier message supprimé du salon",
    usage: ["snipe"],
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

       
       let snipe = client.snipe.get(message.channel.id);

       if(!snipe) return message.channel.send(`Aucun message enregistré.`);

       let msg = snipe?.msg
       let author = snipe?.author

       if(msg.includes("discord.gg/")) msg = "discord.gg/••••••"
       if(msg.includes("https://discord.gg/")) msg = "https://discord.gg/••••••";
       if(msg.includes("discordapp.com/invite/")) msg = "discordapp.com/invite/••••••"
       if(msg.includes("https://discordapp.com/invite/")) msg = "https://discordapp.com/invite/••••••";
       if(msg.includes("discord.com/invite/")) msg = "discord.com/invite/••••••"
       if(msg.includes("https://discord.com/invite/")) msg = "https://discord.com/invite/••••••";

       

       let embed = new Discord.MessageEmbed()
       .setAuthor({name: `${author.tag}`, iconURL: author.avatarURL({dynamic : true})})
       .setDescription(`${msg}`)
       .setColor(color)
       .setFooter(`${footer}`)
       .setImage(snipe.image)

       message.channel.send({embeds : [embed]}); 
    }
}