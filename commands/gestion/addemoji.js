const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "addemoji",
    aliases: ["create"],
    description: "Permet de créer un émoji sur le serveur",
    usage: ["addemoji <nom> <emoji>"],
    category: "gestion",
    
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

        if (message.attachments.size <= 0) {
        let name = args[1];
        let emojiarg = args[0] || message.attachments.first()?.url;
        let emojiparse = Discord.Util.parseEmoji(emojiarg);
        if(!emojiparse) return message.channel.send("Format de l'émoji incorrect");

        const emojiExt = emojiparse.animated ? ".gif" : ".png";
            const emojiURL = `https://cdn.discordapp.com/emojis/${emojiparse.id + emojiExt}`;
            if(!name) name = emojiparse.name
            message.guild.emojis.create(emojiURL, `${name}`).then((em) => {
            message.channel.send(`L'émoji ${em} (**${name}**) a été créé avec succès`);
        });
    } else if (message.attachments.size > 0) {
        let emojiUrll = message.attachments.first().url;
        if (!emojiUrll) return;
        let nom = args[0];
            message.guild.emojis.create(emojiUrll, `${nom}`).then((aaa) => {
            message.channel.send(`L'émoji ${aaa} (**${nom}**) a été créé avec succès`);
        });
    }

    }
}