const { Bot } = require('../../structures/client')
const randomstring = require('randomstring')
const fs = require('fs')
const Discord = require('discord.js')
const { MessageActionRow, MessageButton } = require('discord.js')
const request = require('request')
const ms = require("enhanced-ms")

module.exports = {
    name: 'ready',

    /**
     * 
     * @param {Bot} client 
     */
    run: async (client) => {
       
        setInterval(() => {
            client.guilds.cache.map(guild => {
                if (client.db.get(`show_pic_${guild.id}`)) {
                    let channel = guild.channels.cache.get(client.db.get(`show_pic_${guild.id}`))
                    if (channel) {
                        let users = guild.members.cache.filter(m => m.user.avatarURL()).map(m => m.user)
                        let user = users[Math.floor(Math.random() * users.length)]
                        let avatar = user.displayAvatarURL({dynamic: true, size: 2048});

                        let Embed = new Discord.MessageEmbed()
                        .setColor(client.db.get(`color_${guild.guildId}`) || client.color)
                        .setTitle(`${user.username}`)
                        .setImage(avatar)
                        .setFooter(`${client.footer}`)
                        const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setLabel('Cliquez pour télécharger')
                            .setURL(avatar)
                            .setStyle('LINK'),
                        );

                        channel.send({ embeds: [Embed], components: [row] })


                    }
                }
            })
        }, ms('45s'))
    

    }
}