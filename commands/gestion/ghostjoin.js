const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "ghostjoin",
    aliases: [],
    description: "Permet de configurer le ghostjoin",
    category: "gestion",
    usage: ["ghostjoin add <channel>", "ghostjoin remove <channel>", "ghostjoin list"],

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
        

        let add = args[0] === "add"
        let remove = args[0] === "remove"
        let list = args[0] === "list"

        if (add) {
            if(!channel) return;
            client.db.set(`ghostjoin_${channel.id}`, true)
            message.reply(`Le channel ${channel} est désormais un channel ghostjoin`)
        }

        if (remove) {
            if(!channel) return;
            client.db.delete(`ghostjoin_${channel.id}`)
            message.reply(`Le channel ${channel} n'est plus un channel ghostjoin`)
        }

        if (list) {

            let channels = []

            message.guild.channels.cache.forEach(channel => {
                if (client.db.get(`ghostjoin_${channel.id}`) === true) {
                    channels.push(channel.id)
                }
            })

            if (channels.length === 0) {
                message.reply("Aucun channel ghostjoin")
            }

            if (channels.length > 0) {
                let Embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setTitle(`Channels ghostjoin`)
                    .setDescription(`Il y a actuellement **${channels.length}** channels ghostjoin

${channels.length <= 0 ? "Aucun" : channels.map(channel => `<#${channel}>`).join("\n")}`)
                    .setFooter(footer)
                message.channel.send({ embeds: [Embed] })
            }
        }



    }
}