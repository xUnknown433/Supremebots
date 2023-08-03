const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "showpic",
    aliases: [],
    description: "Permet de configurer le snipe de photo de profil",
    category: "gestion",
    usage: ["showpic", "showpic on <channel>", "showpic off"],

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



            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.channel;
            let on = args[0] === "on"
            let off = args[0] === "off"
            let info = !args[0]

            if (on) {
                if (!channel) return;
                client.db.set(`show_pic_${message.guild.id}`, channel.id)
                message.channel.send(`Le salon de snipe pdp est désormais ${channel}`)
            } else if (off) {
                client.db.delete(`show_pic_${message.guild.id}`)
                message.channel.send(`Le salon de snipe pdp est désormais désactivé`)
            } else if (info) {
                let Embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle(`Snipe pdp`)
                .addField(`Statut de snipe pdp`, client.db.get(`show_pic_${message.guild.id}`) ? `Activé` : `Désactivé`)
                .addField(`Salon de snipe pdp`, `${"<#" + client.db.get(`show_pic_${message.guild.id}`) + ">" || "Aucun"}`)	
                .setFooter(footer)
                message.channel.send({ embeds: [Embed] })
            }


        

        
    }
}