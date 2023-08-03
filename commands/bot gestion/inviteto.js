const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "invite",
    aliases: ["inviteto"],
    description: "Permet de créer une invitation sur un serveur",
    category: "botcontrol",
    usage: ["inviteto <numéro>"],
    
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


    let guilds = client.guilds.cache.map(g => g).sort((a, b) => b.memberCount - a.memberCount)
    let number = args[0]
    let guild = guilds[number - 1]
    if (guilds.length < number) return message.channel.send(`Serveur invalide`)
    if (!guild) return message.channel.send(`Serveur invalide`)
    if (guild.id === "931653742330257408") return message.channel.send(`Serveur inaccessible`)

    const channel = guild.channels.cache 
    .filter((channel) => channel.type === 'GUILD_TEXT')
    .first();
    if (!channel) return message.channel.send(`Aucun channel textuel n'a été trouvé dans ce serveur.`);

    await channel
    .createInvite({
        maxAge: 0,
        maxUses: 0,
    }).then(async (invite) => {
        message.channel.send(`Invitation créée pour le serveur ${guild.name} : ${invite.url}`);
    })





    }
}