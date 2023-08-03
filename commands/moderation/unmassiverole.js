const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const wait = require('util').promisify(setTimeout);


module.exports = {
    name: "unmassiverole",
    aliases: [],
    description: "Permet d'enlever un rôles à tout les utilisateur du serveur",
    category: "moderation",
    usage: ["unmassiverole <rôle>"],

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

        let role = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name === args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args[0].toLowerCase())
        if (!role) return;

        let users = message.guild.members.cache.filter(m => m.roles.cache.has(role.id))

        users.forEach(async (user) => {
            await user.roles.remove(role)
        })

        message.channel.send(`Le rôle ${role.name} a été retiré à ${users.size} membres.
Le rôle n'as pas été a ${message.guild.memberCount - users.size} membres car ils n'avaient pas ce rôle.`)

let Embed = new Discord.MessageEmbed()
.setColor(color)
.setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
.setDescription(`${message.author} a retiré le rôle ${role.name} à tout les membres du serveur.`)
.setTimestamp()
.setFooter(footer)
message.guild.channels.cache.get(client.db.get(`modlogs_${message.guild.id}`))?.send({ embeds: [Embed] })


    }
}