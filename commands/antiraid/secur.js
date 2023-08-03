const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const request = require('request');
const fs = require('fs');
const ms = require('enhanced-ms')


module.exports = {
    name: "secur",
    aliases: ["antiraid"],
    description: "Permet d'afficher les modules et paramètres de sécurité ou de les changer",
    category: "antiraid",
    usage: ["secur [on/off/max]"],
    

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
        "antiupdate",
        "lockurl",
        "antichannel",
        "antirole",
        "antiban",
        "antieveryone",
        "antijoin",
    ]


    let options = [
        "raidping",
        "log",
        "creation",
    ]

    let niveaux = [
        "off",
        "on",
        "max"
    ]

    let sanctions = [
        "kick",
        "ban",
        "derank",
    ]

    let niveau = args[0]

    if (!args[0]) {
        let Embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`Securité - ${message.guild.name}`)
        .addField(`__Paramètres de l'antiraid__ : ${options.length} options`,`\n
**Pingraid** : \`${client.db.get(`pingraid_${message.guild.id}`) || "off"}\`
**Log** : ${!client.db.get(`raidlogs_${message.guild.id}`) ? "\`Désactivé\`" : `<#${client.db.get(`raidlogs_${message.guild.id}`)}>`}
**Creation limit** : \`${!client.db.get(`creatlimit_${message.guild.id}`) || client.db.get(`creatlimit_${message.guild.id}`) === 0 ? "0s" : ms(client.db.get(`creatlimit_${message.guild.id}`))}\`
**Lockurl vanity** : \`${client.db.get(`lockurl_vanity_${message.guild.id}`) || "aucun"}\``, true)
        .addField(`__Modules de l'antiraid__ : ${modules.length+1} modules`,`${modules.map(m => `**${m}** : \`${client.db.get(`${m}.${message.guild.id}`) || "off"} - ${client.db.get(`sanction.${m}.${message.guild.id}`) || "derank"}\``).join('\n')}
**blrank** : \`${client.db.get(`blrank.${message.guild.id}`) || "off"} - ${client.db.get(`sanction.blrank.${message.guild.id}`) || "derank"} - ${client.db.get(`blrank_type_${message.guild.id}`) || "danger"}\`
**antiwebhook** : \`${client.db.get(`antiwebhook.${message.guild.id}`) || "off"} - ${client.db.get(`sanction.antiwebhook.${message.guild.id}`) || "derank"} - ${client.db.get(`antiwebhook_action_${message.guild.id}`) || "delete"}\`
`, true)
       .setFooter(footer)

        message.channel.send({ embeds: [Embed] })
    }

    
    if (niveau === "on") {
        modules.forEach(m => {
            client.db.set(`${m}.${message.guild.id}`, "on")
        })
        client.db.set(`blrank.${message.guild.id}`, "on")
        client.db.set(`antijoin.${message.guild.id}`, "off")

        let Embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`Securité - ${message.guild.name}`)
        .addField(`__Paramètres de l'antiraid__ : ${options.length} options`,`\n
**Pingraid** : \`${client.db.get(`pingraid_${message.guild.id}`) || "off"}\`
**Log** : ${!client.db.get(`raidlogs_${message.guild.id}`) ? "\`Désactivé\`" : `<#${client.db.get(`raidlogs_${message.guild.id}`)}>`}
**Creation limit** : \`${!client.db.get(`creatlimit_${message.guild.id}`) || client.db.get(`creatlimit_${message.guild.id}`) === 0 ? "0s" : ms(client.db.get(`creatlimit_${message.guild.id}`))}\`
**Lockurl vanity** : \`${client.db.get(`lockurl_vanity_${message.guild.id}`) || "aucun"}\``, true)
        .addField(`__Modules de l'antiraid__ : ${modules.length+1} modules`,`${modules.map(m => `**${m}** : \`${client.db.get(`${m}.${message.guild.id}`) || "off"} - ${client.db.get(`sanction.${m}.${message.guild.id}`) || "derank"}\``).join('\n')}
**blrank** : \`${client.db.get(`blrank.${message.guild.id}`) || "off"} - ${client.db.get(`sanction.blrank.${message.guild.id}`) || "derank"} - ${client.db.get(`type.blrank.${message.guild.id}`) || "danger"}\``, true)
        .setFooter(footer)

        message.channel.send({ embeds: [Embed] })
    } else if (niveau === "off") {
        modules.forEach(m => {
            client.db.delete(`${m}.${message.guild.id}`)
        })
        client.db.delete(`blrank.${message.guild.id}`)

        let Embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`Securité - ${message.guild.name}`)
        .addField(`__Paramètres de l'antiraid__ : ${options.length} options`,`\n
**Pingraid** : \`${client.db.get(`pingraid_${message.guild.id}`) || "off"}\`
**Log** : ${!client.db.get(`raidlogs_${message.guild.id}`) ? "\`Désactivé\`" : `<#${client.db.get(`raidlogs_${message.guild.id}`)}>`}
**Creation limit** : \`${!client.db.get(`creatlimit_${message.guild.id}`) || client.db.get(`creatlimit_${message.guild.id}`) === 0 ? "0s" : ms(client.db.get(`creatlimit_${message.guild.id}`))}\`
**Lockurl vanity** : \`${client.db.get(`lockurl_vanity_${message.guild.id}`) || "aucun"}\``, true)
        .addField(`__Modules de l'antiraid__ : ${modules.length+1} modules`,`${modules.map(m => `**${m}** : \`${client.db.get(`${m}.${message.guild.id}`) || "off"} - ${client.db.get(`sanction.${m}.${message.guild.id}`) || "derank"}\``).join('\n')}
**blrank** : \`${client.db.get(`blrank.${message.guild.id}`) || "off"} - ${client.db.get(`sanction.blrank.${message.guild.id}`) || "derank"} - ${client.db.get(`type.blrank.${message.guild.id}`) || "danger"}\``, true)
        .setFooter(footer)

        message.channel.send({ embeds: [Embed] })
    } else if (niveau === "max") {
        modules.forEach(m => {
            client.db.set(`${m}.${message.guild.id}`, "max")
        })
        client.db.set(`blrank.${message.guild.id}`, "max")
        client.db.set(`antijoin.${message.guild.id}`, "off")

        let Embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`Securité - ${message.guild.name}`)
        .addField(`__Paramètres de l'antiraid__ : ${options.length} options`,`\n
**Pingraid** : \`${client.db.get(`pingraid_${message.guild.id}`) || "off"}\`
**Log** : ${!client.db.get(`raidlogs_${message.guild.id}`) ? "\`Désactivé\`" : `<#${client.db.get(`raidlogs_${message.guild.id}`)}>`}
**Creation limit** : \`${!client.db.get(`creatlimit_${message.guild.id}`) || client.db.get(`creatlimit_${message.guild.id}`) === 0 ? "0s" : ms(client.db.get(`creatlimit_${message.guild.id}`))}\`
**Lockurl vanity** : \`${client.db.get(`lockurl_vanity_${message.guild.id}`) || "aucun"}\``, true)
        .addField(`__Modules de l'antiraid__ : ${modules.length+1} modules`,`${modules.map(m => `**${m}** : \`${client.db.get(`${m}.${message.guild.id}`) || "off"} - ${client.db.get(`sanction.${m}.${message.guild.id}`) || "derank"}\``).join('\n')}
**blrank** : \`${client.db.get(`blrank.${message.guild.id}`) || "off"} - ${client.db.get(`sanction.blrank.${message.guild.id}`) || "derank"} - ${client.db.get(`type.blrank.${message.guild.id}`) || "danger"}\``, true)
        .setFooter(footer)

        message.channel.send({ embeds: [Embed] })
    }
    



}
}
