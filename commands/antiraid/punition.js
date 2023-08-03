const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const request = require('request');
const fs = require('fs');
const ms = require('enhanced-ms')


module.exports = {
    name: "punition",
    aliases: ["punish"],
    description: "Permet de gérer les punitions de l'antiraid",
    category: "antiraid",
    usage: ["punition all ban/kick/derank", "punition [module] ban/kick/derank"],
    

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

    let modules = [
        "antibot",
        "antiwebhook",
        "antiupdate",
        "lockurl",
        "antichannel",
        "antirole",
        "antiban",
        "antieveryone",
        "blrank",
        "antijoin",
    ]

    let sanctions = [
        "kick",
        "ban",
        "derank",
    ]

    let all = args[0] === "all" && sanctions.includes(args[1])
    let module = modules.includes(args[0]) && sanctions.includes(args[1])

    if (all) {
        modules.forEach(async (m) => {
            await client.db.set(`sanction.${m}.${message.guild.id}`, args[1])
        })
        message.channel.send(`La punition en cas de **__raid__** sera maintenant un **${args[1]}**.`)
    }

    if (module) {
        await client.db.set(`sanction.${args[0]}.${message.guild.id}`, args[1])
        message.channel.send(`La punition du module **__${args[0]}__** sera maintenant un **${args[1]}**.`)
    }



}
}