const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const ms = require("enhanced-ms")

module.exports = {
    name: "mutelimit",
    aliases: [],
    description: "Permet de configurer le mutelimit",
    category: "gestion",
    usage: ["mutelimit <temps>", "mutelimit del", "mutelimit"],
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

        let add = args[0] !== "del" && args[0]
        let remove = args[0] === "del"
        let get = !args[0]

        if (add) {
            let time = ms(args[0])
            if (time > ms("28d") || !time) return message.reply('Le temps doit être inférieur à 28j');
            if(!time || time === 0) return message.reply("Veuillez entrer un temps")

            client.db.set(`mutelimit_${message.guild.id}`, time)
            message.reply(`Le temps limite des tempmute seras désormais de \`${args[0]}\``)
        }

        if (remove) {
            client.db.delete(`mutelimit_${message.guild.id}`)
            message.reply(`Le mutelimit a été retiré`)
        }

        if (get) {
            message.reply(`Le mutelimit est ${client.db.get(`mutelimit_${message.guild.id}`) <= 0 ? "**♾️ (aucun)**" : `de **${ms(client.db.get(`mutelimit_${message.guild.id}`))}**`}`)
        }


    }
}