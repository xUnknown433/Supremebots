const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: "voicemove",
    aliases: ["vmove"],
    description: "Permet de moove un utilisateur dans un channel vocal",
    category: "moderation",
    usage: ["voicemove <utilisateur> [channel]"],


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
        let channel = message.guild.channels.cache.get(args[1]) || message.mentions.channels.first() || message.guild.channels.cache.find(c => c.name === args[1]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args[1].toLowerCase())
        if (!user) return;
        if (!channel) return;

        let userVoiceChannel = user.voice.channel;
        if(!userVoiceChannel) return message.reply(`${user.user.username} n'est pas dans un channel vocal`)
        
        await user.voice.setChannel(channel).then(async () => {
            await message.reply(`${user.user.username} a été déplacé du channel vocal (${userVoiceChannel}) vers le channel vocal (${channel})`)
        })

        let Embed = new Discord.MessageEmbed()
        .setColor(color)
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setDescription(`${message.author} a déplacé ${user} du channel vocal (${userVoiceChannel}) vers le channel vocal (${channel})`)
        .setTimestamp({ format: "DD/MM/YYYY - HH:mm:ss" })
        .setFooter(footer)
        message.guild.channels.cache.get(client.db.get(`modlogs_${message.guild.id}`))?.send({ embeds: [Embed] })

    }
}