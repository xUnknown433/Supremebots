const { Bot } = require('../../structures/client')
const Discord = require('discord.js')
const fs = require('fs')
const { exec } = require('child_process')
const ms = require('enhanced-ms')

module.exports = {
    name: 'messageCreate',

    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message
     */
    run: async (client, message) => {
        let guild = message.guild
        if (!guild) return

        let antilink = client.db.get(`antilink.${guild.id}`)
        let antitype = client.db.get(`antilink.type.${guild.id}`) || "invites"
        if(!antilink) return;

        let ignore = client.db.get(`antilink.ignore.${guild.id}.${message.channel.id}`)
        if(ignore) return;
        

        let sanction = await client.db.get(`sanction.antilink.${guild.id}`)
        if (message.author.id === client.user.id) return;

        let perm;
        if (antilink === "on") perm = !client.config.buyers.includes(message.author.id) === false || client.staff.includes(message.author.id) || client.db.get(`owner_${message.author.id}`) === true || client.db.get(`wlmd_${guild.id}_${message.author.id}`) === true || message.author.id === client.user.id
        if (antilink === "max") perm = client.config.buyers.includes(message.author.id) === false || client.staff.includes(message.author.id) || client.db.get(`owner_${message.author.id}`) === true || message.author.id === client.user.id

        if (perm) return;
      
        if (antilink === "on" || antilink === "max") {


            if (antitype === "all") {
            let confirm = is_url_max(message.content)
            if (confirm === false) return;
            message.delete()
            if (client.db.get(`antilink_violations_${guild.id}_${message.author.id}`) >= 5) {
              message.guild.members.cache.get(message.author.id).timeout(ms('5m'))
              client.db.set(`antilink_violations_${guild.id}_${message.author.id}`, -1)
              message.channel.bulkDelete(1)
            }
              client.db.add(`antilink_violations_${guild.id}_${message.author.id}`, 1)
            return message.channel.send(`<@${message.author.id}> vous n'avez pas l'autorisation d'envoyer des liens ici`).then(m => m.delete({ timeout: 3500 }));
           
            } else if (antitype === null || antitype === undefined || antitype === "invites") {
            let confirm = is_url_invite(message.content)
            if (confirm === false) return;
            message.delete()
            if (client.db.get(`antilink_violations_${guild.id}_${message.author.id}`) >= 5) {
              message.guild.members.cache.get(message.author.id).timeout(ms('5m'))
              client.db.set(`antilink_violations_${guild.id}_${message.author.id}`, -1)
              message.channel.bulkDelete(1)
            }
              client.db.add(`antilink_violations_${guild.id}_${message.author.id}`, 1)
            return message.channel.send(`<@${message.author.id}> vous n'avez pas l'autorisation d'envoyer des liens ici`).then(m => m.delete({ timeout: 3500 }));
        
            }
        }       

    
        function is_url_max(str) {
            let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
            if(regexp.test(str)) {
              return true;
            } else {
              return false;
            }
            
          }
          
          function is_url_invite(str) {
            let discordInvite = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;
             if(discordInvite.test(str)) {
               return true;
             } else {
               return false;
             }
             
           }


    }
}