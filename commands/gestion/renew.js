const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "renew",
    aliases: ["purge", "recreate"],
    description: "Permet de récréer un salon",
    category: "moderation",
    usage: ["renew [channel]"],

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


        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
        if(!channel) channel = message.channel;

        try {
            channel.clone({reason: `Recrée par ${message.author.tag}`}).then(c => {
                c.send(`${message.author} channel recreé`).then(m => m.delete({ timeout: 3000 }))
                let Embed = new Discord.MessageEmbed()
                .setColor(color)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription(`${message.author} a récréé un channel (nouveau salon : ${c})`)
                .setTimestamp()
                .setFooter(footer)
                message.guild.channels.cache.get(client.db.get(`modlogs_${message.guild.id}`))?.send({ embeds: [Embed] })
    
            })
            channel.delete({ reason: `Recrée par ${message.author.tag}` })

        } catch (e) {
            console.log(e)
        }




        
    }
}