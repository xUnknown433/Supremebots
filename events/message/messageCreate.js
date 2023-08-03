const { Bot } = require('../../structures/client')
const Discord = require('discord.js')
const fs = require('fs')
module.exports = {
    name: 'messageCreate',

    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     */
    run: async (client, message) => {
        try {
            if (!message) return 
            if (!message.guild || !message.author) return
            if(message.author.bot) return
            let color = client.db.get(`color_${message.guildId}`) || client.color
            let prefix = client.db.get(`prefix_${message.guildId}`) || client.prefix
            let footer = client.footer
            if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>` || message.content === `${client.user.id}` || message.content === `§§§?4402`) return message.reply(`Mon prefix est \`${prefix}\``).catch(e => { })
            if (!message.content.startsWith(prefix) || message.content === prefix || message.content.startsWith(prefix + ' ')) prefix = `<@${client.user.id}>`
            if (!message.content.startsWith(prefix) || message.content === prefix || message.content.startsWith(prefix + ' ')) prefix = `<@!${client.user.id}>`
            if (!message.content.startsWith(prefix) || message.content === prefix || message.content.startsWith(prefix + ' ')) prefix = `<@${client.user.id}> `
            if (!message.content.startsWith(prefix) || message.content === prefix || message.content.startsWith(prefix + ' ')) prefix = `<@!${client.user.id}> `
            if (!message.content.startsWith(prefix) || message.content === prefix || message.content.startsWith(prefix + ' ')) prefix = `${client.user.id} `
            if (!message.content.startsWith(prefix) || message.content === prefix || message.content.startsWith(prefix + ' ')) prefix = `${client.user.id}`
            if (!message.content.startsWith(prefix) || message.content === prefix || message.content.startsWith(prefix + ' ')) prefix = `§§§?4402`
            if (!message.content.startsWith(prefix) || message.content === prefix || message.content.startsWith(prefix + ' ')) return
            const args = message.content.slice(prefix.length).trim().split(/ +/g)
            const commandName = args[0].toLowerCase().normalize()
            const cmd = client.commands.get(commandName) || client.aliases.get(commandName)
            args.shift()
            if (!cmd) return
            prefix = client.db.get(`prefix_${message.guildId}`) || client.prefix
            cmd.run(client, message, args, color, prefix, footer, commandName)
        } catch (err) {
            console.log("messageCreate error : " + err)
        }
    }
}