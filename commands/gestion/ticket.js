const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "ticket",
    aliases: [],
    description: "Permet de gérer les tickets",
    category: "gestion",
    usage: ["ticket", "ticket title <texte>", "ticket reset_title", "ticket description <texte>", "ticket reset_description", "ticket react", "ticket reset_react", "ticket close", "ticket add", "ticket remove"],

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

message.reply(`Désactivé temporairement`)

/*
        let ticket_title = client.db.get(`ticket_title_${message.guild.id}`)
        let ticket_description = client.db.get(`ticket_description_${message.guild.id}`)
        let ticket_react = client.db.get(`ticket_react_${message.guild.id}`)

        let send = !args[0]
        let title = args[0] === "title"
        let description = args[0] === "description"
        let react = args[0] === "react"
        let bvn = args[0] === "bvn"
        let close = args[0] === "close"

        let reset = args[0] === "reset"
        let reset_title = args[0] === "reset_title"
        let reset_description = args[0] === "reset_description"
        let reset_react = args[0] === "reset_react"
        let reset_bvn = args[0] === "reset_bvn"

        let add = args[0] === "add"
        let remove = args[0] === "remove"


        if (send) {

        let Embed = new Discord.MessageEmbed()
        .setTitle(`${ticket_title || "Non défini"}`)
        .setDescription(`${ticket_description || "Non défini"}`)
        .setFooter(footer)
        .setColor(color)

        let m = await message.channel.send({ embeds: [Embed]})
        await m.react(ticket_react || "📩")
        client.db.set(`ticket_${message.guild.id}`, m.id)

        } else if (title) {
            client.db.set(`ticket_title_${message.guild.id}`, args.slice(1).join(" "))
            let Embed = new Discord.MessageEmbed()
            .setTitle(`${args.slice(1).join(" ")}`)
            .setDescription(`${ticket_description || "Non défini"}`)
            .setFooter(footer)
            .setColor(color)
            await message.channel.send({ embeds: [Embed], content: `Voici comment le ticket sera affiché :`})
        } else if (description) {
            client.db.set(`ticket_description_${message.guild.id}`, args.slice(1).join(" "))
            let Embed = new Discord.MessageEmbed()
            .setTitle(`${ticket_title || "Non défini"}`)
            .setDescription(`${args.slice(1).join(" ")}`)
            .setFooter(footer)
            .setColor(color)
            await message.channel.send({ embeds: [Embed], content: `Voici comment le ticket sera affiché :`})
        } else if (react) {
            client.db.set(`ticket_react_${message.guild.id}`, args.slice(1).join(" "))
            let Embed = new Discord.MessageEmbed()
            .setTitle(`${ticket_title || "Non défini"}`)
            .setDescription(`${ticket_description || "Non défini"}`)
            .setFooter(footer)
            .setColor(color)

            let mm = await message.channel.send({ embeds: [Embed], content: `Voici comment le ticket sera affiché :`})
            await mm.react(args.slice(1).join(" "))
        }
        else if (reset) {
            client.db.delete(`ticket_${message.guild.id}`)
            client.db.delete(`ticket_title_${message.guild.id}`)
            client.db.delete(`ticket_description_${message.guild.id}`)
            client.db.delete(`ticket_react_${message.guild.id}`)
            let Embed = new Discord.MessageEmbed()
            .setTitle(`Non défini`)
            .setDescription(`Non défini`)
            .setFooter(footer)
            .setColor(color)
            await message.channel.send({ embeds: [Embed], content: `Voici comment le ticket sera affiché :`})
        } else if (reset_title) {
            client.db.delete(`ticket_title_${message.guild.id}`)
            let Embed = new Discord.MessageEmbed()
            .setTitle(`"Non défini`)
            .setDescription(`${ticket_description || "Non défini"}`)
            .setFooter(footer)
            .setColor(color)
            await message.channel.send({ embeds: [Embed], content: `Voici comment le ticket sera affiché :`})
        } else if (reset_description) {
            client.db.delete(`ticket_description_${message.guild.id}`)
            let Embed = new Discord.MessageEmbed()
            .setTitle(`${ticket_title || "Non défini"}`)
            .setDescription(`Non défini`)
            .setFooter(footer)
            .setColor(color)
            await message.channel.send({ embeds: [Embed], content: `Voici comment le ticket sera affiché :`})
        } else if (reset_react) {
            client.db.delete(`ticket_react_${message.guild.id}`)
            let Embed = new Discord.MessageEmbed()
            .setTitle(`${ticket_title || "Non défini"}`)
            .setDescription(`${ticket_description || "Non défini"}`)
            .setFooter(footer)
            .setColor(color)
            let mm = await message.channel.send({ embeds: [Embed], content: `Voici comment le ticket sera affiché :`})
            await mm.react("📩")
        } else if (add) {
            // if channel don't start with ticket- return;
            let channel = message.channel
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(m => m.displayName.toLowerCase().includes(args[1].toLowerCase())) || message.guild.members.cache.find(m => m.user.username.toLowerCase().includes(args[1].toLowerCase())) || message.guild.members.cache.find(m => m.user.tag.toLowerCase().includes(args[1].toLowerCase()))
            if (!channel.name.startsWith("ticket-")) return message.channel.send(`Ce n'est pas un ticket.`)

            // change chanel permissions and add permission to user to see it and write in it
            channel.permissionOverwrites.edit(user.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                ADD_REACTIONS: true,
            })
            channel.send(`${user} a été ajouté au ticket.`)
        } else if (remove) {
            // if channel don't start with ticket- return;
            let channel = message.channel
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(m => m.displayName.toLowerCase().includes(args[1].toLowerCase())) || message.guild.members.cache.find(m => m.user.username.toLowerCase().includes(args[1].toLowerCase())) || message.guild.members.cache.find(m => m.user.tag.toLowerCase().includes(args[1].toLowerCase()))
            if (!channel.name.startsWith("ticket-")) return message.channel.send(`Ce n'est pas un ticket.`)

            // change chanel permissions and add permission to user to see it and write in it
            channel.permissionOverwrites.edit(user.id, {
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
            })
            channel.send(`${user} a été retiré du ticket.`)
        } else if (close) {
            let channel = message.channel
            if (!channel.name.startsWith("ticket-")) return message.channel.send(`Ce n'est pas un ticket.`)

            message.reply(`Êtes vous sur de vouloir fermer ce ticket ?, tapez \`${prefix}confirm\` pour confirmer.`).then(async (m) => {
                message.channel.awaitMessages({filter: m => m.author.id === message.author.id, max: 1, time: 60000, errors: ["time"]}).then((collected) => {
                    if (collected.first().content === `${prefix}confirm`) {
                        channel.delete()
                    }
                }).catch(() => {
                    m.edit(`La commande a été annulée.`)
                })
            })
                


        } else if (bvn) {
            client.db.set(`ticket_bvn_${message.guild.id}`, args.slice(1).join(" "))
            message.send(`Le message de bienvenue des tickets a été modifié.`)
        }
             
*/
    }
}