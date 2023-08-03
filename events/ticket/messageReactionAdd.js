const { Bot } = require('../../structures/client')
const Discord = require('discord.js')
const fs = require('fs')
const { exec } = require('child_process')
module.exports = {
    name: 'messageReactionAdd',

    /**
     * @param {Bot} client 
     * @param {Discord.MessageReaction} reaction
     * @param {Discord.GuildMember} user
     */
    run: async (client, reaction, user) => {

/*
        console.log(`Test passé 🎓1`)

        let guild = reaction.message.guild
        if(!reaction) return console.log(`Test passé 🎓2`)
        if(!user) return console.log(`Test passé 🎓3`)
        let message = reaction.message;
        if(!message.guild) return;
        console.log(`Test passé 🎓4`)

        const member = message.guild.members.cache.get(user.id);
        const emoji = reaction.emoji.name;
        const userReaction = message.reactions.cache.filter(reaction => reaction.users.cache.has(member.user.id));
        
        if (member.user.bot) return;
        if (reaction.message.channel.type === 'dm') return;


        if (message.partial) {
            console.log(`Test passé 🎓5`)
            try {
                await message.fetch()
                await reaction.fetch()
            } catch {
                return console.log(`Test passé 🎓`)
            }
        }


        userReaction.forEach(reaction => reaction.users.remove(member.user.id))
        let ticket_react = client.db.get(`ticket_react_${guild.id}`) || "📩"

        if (ticket_react.includes(emoji)) {
            switch (emoji) {
                case ticket_react:
                    if (!client.db.get(`ticket_${guild.id}`)) return;
                    if (reaction.message.id !== client.db.get(`ticket_${guild.id}`)) return;
                    reaction.users.remove(member.user.id);
            }

        let ticket_perm = client.db.get(`perm_ticket.${guild.id}`) || []
        let bvn_ticket = client.db.get(`ticket_bvn_${guild.id}`) || "Non défini"

        let roles = ticket_perm?.filter(r => guild.roles.cache.get(r)) || []

        let alreadyOpenned = false;
        guild.channels.cache.filter(c => c.name.startsWith("ticket-")).forEach(c => {
            if (c.topic === user.id) alreadyOpenned = true
        })
        if(alreadyOpenned) return reaction.message.channel.send(`Vous avez déjà un ticket ouvert.`).then(m => m.delete({timeout: 2500}))

        guild.channels.create(`ticket-${user.username}`, {
            type: 'text'
        }).then(async channel => {
            channel.setTopic(`${user.id}`);
            const everyone = guild.roles.everyone
            await channel.permissionOverwrites.edit(everyone, {
                VIEW_CHANNEL: false,
            })

            await channel.permissionOverwrites.edit(guild.members.cache.get(user.id), {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                READ_MESSAGE_HISTORY: true,
                EMBED_LINKS: true,
                ATTACH_FILES: true,
                ADD_REACTIONS: true,
            })

            roles.forEach(r => {
                channel.permissionOverwrites.edit(guild.roles.cache.get(r), {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: true,
                    READ_MESSAGE_HISTORY: true,
                    EMBED_LINKS: true,
                    ATTACH_FILES: true,
                    ADD_REACTIONS: true,
                })
            })



            let Embed = new Discord.MessageEmbed()
            .setColor(client.db.get(`color.${guild.id}`) || client.color)
                .setDescription(bvn_ticket)
            channel.send(Embed).then(async msg => {
                await msg.react("🔒")
            })

            if (["🔒"].includes(emoji)) {
                switch (emoji) {
                    case "🔒":
                        try {
                            if (!reaction.message.channel.name.startsWith("ticket-")) return;
                            for (const reaction of userReaction.values()) {
                                reaction.users.remove(member.user.id);
                            }
                        } catch (err) {
    
                        }
                }
                reaction.message.channel.delete()
            }
        })
    

    }
   */     
    }
}