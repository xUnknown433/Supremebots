const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const request = require('request');
const fs = require('fs');
const ms = require('enhanced-ms')


module.exports = {
    name: "lockurl",
    aliases: ["lockvanity"],
    description: "Permet de configurer le lock url",
    category: "antiraid",
    usage: ["lockurl <vanity>", "lockurl on", "lockurl off", "lockurl max"],
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

if(message.guild.premiumTier !== "TIER_3"){
    return message.channel.send(`Ce serveur ne possède pas le niveau 3.`)
}

if(!message.guild.features.includes('VANITY_URL')) {
    return message.channel.send(`Ce serveur ne possède pas le vanity url.`)
}

if(args[0].startsWith("discord.gg/") || args[0].startsWith("discord.gg")){
    return message.channel.send(`Format incorrect.\nExemple: ${prefix}lockurl vanity`)
}

if (args[0] !== "on" && args[0] !== "off" &&  args[0] !== "max"){

    if (message.guild.vanityURLCode !== args[0]) return message.channel.send(`Ceci n'est pas le code de votre vanity url.`)
    if (message.guild.vanityURLCode === args[0]) {
        client.db.set(`lockurl_vanity_${message.guild.id}`, args[0].toLowerCase())
        message.channel.send(`Le lock url a été configuré sur \`discord.gg/${args[0].toLowerCase()}\``)
        return;
    }


}

if (args[0] === "on") {
    client.db.set(`lockurl.${message.guild.id}`, "on")
    message.channel.send(`Le lock url a été activé.`)
} else if (args[0] === "off") {
    client.db.set(`lockurl.${message.guild.id}`)
    message.channel.send(`Le lock url a été désactivé.`)
} else if (args[0] === "max") {
    client.db.set(`lockurl.${message.guild.id}`, "max")
    message.channel.send(`Le lock url est au maximum.`)
}

}
}