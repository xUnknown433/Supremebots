const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "piconly",
    aliases: ["picchannel", "channelphoto"],
    description: "Permet de gérer les salons photos",
    category: "gestion",
    usage: ["piconly add <channel>", "piconly remove <channel>", "piconly list"],

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
            client.db.set(`photo_${channel.id}`, true)
            message.reply(`Le channel ${channel} est désormais un channel photo`)
        }

        if (remove) {
            client.db.delete(`photo_${channel.id}`)
            message.reply(`Le channel ${channel} n'est plus un channel photo`)
        }

        if (list) {

            let channels = []

            message.guild.channels.cache.forEach(channel => {
                if (client.db.get(`photo_${channel.id}`) === true) {
                    channels.push(channel.id)
                }
            })

            if (channels.length === 0) {
                message.reply("Aucun channel photo")
            }

            if (channels.length > 0) {
                let Embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setTitle(`Channels photo`)
                    .setDescription(`Il y a actuellement **${channels.length}** channels photo

<#${channels.join("\n")}>`)
                    .setFooter(footer)
                message.channel.send({ embeds: [Embed] })
            }
        }



    }
}