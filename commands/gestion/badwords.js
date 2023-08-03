const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "badwords",
    aliases: [],
    description: "Permet de gérer les badwords",
    category: "gestion",
    usage: ["badwords list", "badwords on", "badwords off", "badwords add <mot>", "badwords remove <mot>"],
    
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



        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.channel;
        if(!channel) return;

        let on = args[0] === "on"
        let off = args[0] === "off"
        let add = args[0] === "add"
        let remove = args[0] === "remove"
        let list = args[0] === "list"

        if (on) {
            client.db.set(`badw_${message.guild.id}`, true)
            message.reply(`Les badwords sont désormais activés`)
        }

        if (off) {
            client.db.delete(`badw_${message.guild.id}`)
            message.reply(`Les badwords sont désormais désactivés`)
        }

        if (add) {
            let word = args[1].toLowerCase()
            if(!word) return;
            let words = client.db.get(`badwords_${message.guild.id}`) || []
            if(words.includes(word)) return message.reply(`Ce badword existe déjà`)
            client.db.push(`badwords_${message.guild.id}`, word)
            message.reply(`Le badword \`${word}\` a bien été ajouté`)
        }

        if (remove) {
            let word = args[1].toLowerCase()
            if(!word) return;
            let words = client.db.get(`badwords_${message.guild.id}`)
            if (words.length > 0) {
            if(!words.includes(word)) return message.reply(`Ce badword n'existe pas`)
            }
            client.db.set(`badwords_${message.guild.id}`, words.filter(w => w !== word))
            message.reply(`Le badword \`${word}\` a bien été supprimé`)
        }



        if (list || !args[0]) {

            let badwords = client.db.get(`badwords_${message.guild.id}`)

            if (!badwords || badwords.length === 0) {
                message.reply(`Il n'y a aucun badword dans ce serveur`)
                return
            }

            let embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle(`Badwords de ${message.guild.name}`)
                .setDescription(`\`${badwords.join("\n")}\`

**Statut : **\`${client.db.get(`badw_${message.guild.id}`) === true ? "Activé" : "Désactivé"}\``)
                .setFooter(footer)
            
            message.channel.send({ embeds: [embed] })

            
        }



    }
}