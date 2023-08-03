const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "autoreact",
    aliases: [],
    description: "Permet de configurer le autoreact",
    category: "gestion",
    usage: ["autoreact add <channel> <emoji>", "autoreact remove <channel> <emoji>", "autoreact list"],

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
        if(!channel) return;

        let add = args[0] === "add"
        let remove = args[0] === "remove"
        let list = args[0] === "list"

        if (add) {
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            let emoji = args[2] || message.guild.emoji
            if (!emoji) return;
            if (!channel) return;
            client.db.push(`autoreact_${message.guild.id}`, {channel: channel.id, emoji: emoji})
            message.reply(`Le messages dans ${channel} auront automatiquement comme réaction : ${emoji}`)
        }

        if (remove) {
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            let emoji = args[2] || message.guild.emoji
            if (!emoji) return;
            if (!channel) return;
            client.db.set(`autoreact_${message.guild.id}`, client.db.get(`autoreact_${message.guild.id}`).filter(r => r.channel !== channel.id && r.emoji !== emoji))
            message.reply(`Le messages dans ${channel} n'auront plus automatiquement comme réaction : ${emoji}`)
        }

        if (list) {

            let autoreact = client.db.get(`autoreact_${message.guild.id}`)
            if (!autoreact || autoreact.length === 0) return message.reply("Il n'y a pas d'auto react sur ce serveur.")

            if (autoreact.length > 0) {
                let Embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setTitle(`Channels autoreact`)
                    .setDescription(`Il y a actuellement **${autoreact.length}** channels autoreact

${autoreact.map(r => `<#${r.channel}> : ${r.emoji}`).join("\n")}`)
                    .setFooter(footer)
                message.channel.send({ embeds: [Embed] })
            }
        }



    }
}