const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "setpic",
    aliases: ["setavatar"],
    description: "Permet de changer la photo de profil du bot",
    category: "botcontrol",
    usage: ["setpic [lien/upload]"],
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

        if (message.attachments.size <= 0) {

           if (args[0] === "me") {
            let pic = message.author.avatarURL({format: "png", dynamic: true, size: 1024});
            if(!pic) return message.reply("Vous n'avez pas d'avatar.");

            client.user.setAvatar(pic);
           } else if (args[0] === "server") {
            let pic = message.guild.iconURL({format: "png", dynamic: true, size: 1024});
            if(!pic) return message.reply("Le serveur n'a pas d'icon.");

            client.user.setAvatar(pic);
           }

           message.reply("L'avatar du bot a été mis à jour.");

        }

        if (message.attachments.size > 0) {
            let pic = message.attachments.first().url;
            if(!pic) return;

            client.user.setAvatar(pic);
            message.reply("L'avatar du bot a été mis à jour.");
        }
        
    
    }
}