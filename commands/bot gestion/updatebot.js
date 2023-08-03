const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const request = require('request');
const { exec } = require('node:child_process')
const fs = require('fs');

module.exports = {
    name: "updatebot",
    aliases: ["update"],
    description: "Permet de mettre à jour le bot",
    category: "botcontrol",
    usage: ["updatebot"],
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

    

    request('http://localhost:3000/gestion/version', (error, response, body) => {
        let currentVersion = client.version;
        if (error) return console.log(error);
        let version = body;
        if (currentVersion === version) return message.channel.send(`Le bot est déjà à la dernière version.`)
        message.channel.send(`Mise à jour du bot....`).then(async () => {
        client.user.setPresence({ status: 'invisible' })
        exec(`cd /home/perso/gestion/${client.user.id} && rm -r commands events structures && cd /home/perso/maj/gestion && cp -r * /home/perso/gestion/${client.user.id} && pm2 restart ${client.user.id}`, (err, stdout, stderr) => {})
        fs.writeFile(`version.json`, JSON.stringify({ version: version }), (err) => {
            if (err) console.log(err);
        })
    })
    })


    }
}