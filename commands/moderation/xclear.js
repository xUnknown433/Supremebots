const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const ms = require('enhanced-ms')
module.exports = {
    name: "xclear",
    aliases: [],
    description: "Permet de supprimer toutes les sanctions du serveur ou d'un utilisateur",
    category: "moderation",
    usage: ["xclear sanctions all <utilisateur>", "xclear sanctions all"],


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

        let sanctionz = args[0] === "sanctions" && !args[1] === "all";
        let sanctions_all = args[0] === "sanctions" && args[1] === "all";
        
        if (sanctionz) {
            let sanction = client.db.get(`sanctions_${message.guild.id}`)
            if (!sanction) return message.channel.send(`Aucune sanction n'a été trouvée`)
            let user = message.mentions.members.first()
            if (!user) return message.channel.send(`Veuillez mentionner un utilisateur`)
            client.db.set(`sanctions_${message.guild.id}`, sanction.filter(s => s.user !== user.id))
            return message.channel.send(`Les sanctions de l'utilisateur ${user.user.tag} ont été supprimées avec succès`)
        } 

        if (sanctions_all) {
            let sanction = client.db.get(`sanctions_${message.guild.id}`)
            if (!sanction) return message.channel.send(`Aucune sanction n'a été trouvée`)
            client.db.delete(`sanctions_${message.guild.id}`)
            return message.channel.send(`Les sanctions de ce serveur (${message.guild.name}) ont été supprimées avec succès`)
        }


    }
}