const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const request = require('request');

module.exports = {
    name: "unbl",
    aliases: ["unblacklist"],
    description: "Permet d'enlever un utilisateur de la blacklist",
    category: "botcontrol",
    usage: ["unbl <ID>"],
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


        let id = args[0]
        request.get(`https://discordapp.com/api/users/${id}`, {
            headers: {
                'Authorization': `Bot ${client.config.token}`
            }
        }, async (err, res, body) => {
            if(err) return message.channel.send(`Cet utilisateur n'existe pas ou est introuvable.`);
            let user = JSON.parse(body);

            if (user.username === undefined) return message.channel.send(`Cet utilisateur n'existe pas ou est introuvable.`);


        client.db.delete(`blmd_${client.user.id}_${user.id}`)
        client.db.set(`bl.${client.user.id}`, client.db.get(`bl.${client.user.id}`)?.filter(m => m !== user.id) || [])
        message.channel.send(`${user.username} a été retiré de la blacklist`)
    })
    


    }
}