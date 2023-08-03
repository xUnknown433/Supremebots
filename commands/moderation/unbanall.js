const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "unbanall",
    description: "Permet de révoquer le bannissement de tout les bannis du serveur",
    usage: ["unbanall"],
    category: "moderation",

    /**
     * @param {bot} client
     * @param {Discord.Message} message
     * @param {String[]} args
     */

    run: async(client, message, args, color, prefix, footer, commandName) => {
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

        let bcount = 0;

        message.guild.bans.fetch().then((b) => {
            if(b.size < 1) return message.channel.send("Il n'y a aucun banni dans le serveur");
            b.forEach((bans) => {
                message.guild.members.unban(bans.user.id); 
                bcount+=1; 
            })
        }); 

        message.channel.send(`${bcount} utilisateurs ont étés débannis du serveur`);
    }
}

