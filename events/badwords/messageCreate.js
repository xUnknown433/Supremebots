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
        
        if (!message.guild) return;

        let badwords = client.db.get(`badw_${message.guild.id}`)
        if(!badwords) return;

        let perm = client.config.buyers.includes(message.author.id) || client.db.get(`owner_${message.author.id}`) == true || client.db.get(`wl.${message.guild.id}.${message.author.id}`) == true || client.user.id === message.author.id
        if(perm) return;

        let words = client.db.get(`badwords_${message.guild.id}`) || []
        let msg = message.content.toLowerCase()
        let bad = false
        for(let i = 0; i < words.length; i++){
            if(msg.includes(words[i])){
                bad = true
                break
            }
        }
        if(bad){
     message.delete()
     message.channel.send(`${message.author} vous ne pouvez pas ce mots interdits`).then(m => m.delete({timeout: 1500}))
        }


    }
}