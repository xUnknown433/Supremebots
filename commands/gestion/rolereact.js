const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: "rolereact",
    aliases: ["rr", "reactrole", "rolemenu"],
    description: "Permet de gérer les rôles react",
    category: "gestion",
    usage: ["rolereact", "rolereact <channel> <messageID> <role> <react> react/button"],

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

message.reply(`Désactivé temporairement`)

/*
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
    let messagez = channel.messages.cache.get(args[1])
    let messageID = messagez.id
    let role = message.guild.roles.cache.get(args[2]) || message.mentions.roles.first()
    let reaction = message.guild.emojis.cache.get(args[3]) || args[3]
    let type = args[4]

    client.db.set(`rolereact_${message.guild.id}_${messageID}`, { role: role.id, emoji: reaction })

    let Embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`Rôle ajouté`)
        .setDescription(`Le rôle ${role.name} a bien été ajouté au [message](https://discord.com/channels/${message.guild.id}/${channel.id}/${messageID}) avec l'émoji ${reaction}`)
        .setFooter(footer)



    if(type === "react"){
        message.channel.send({ embeds: [Embed] })
        messagez.react(reaction)
    } else if(type === "button"){
        let button = new MessageButton()
        .setEmoji(reaction)
        message.channel.send({ embeds: [Embed], components: [button] })

    }

    */
    
    }
}