const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "joindm",
    aliases: [],
    description: "Permet de configurer le join dm",
    category: "gestion",
    usage: ["joindm", "joindm set <texte>", "joindm del"],
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

        let add = args[0] === "set"
        let remove = args[0] === "del"
        let list = !args[0]

        if (add) {
            let texte = args.slice(1).join(" ")
            if(!texte) return message.reply("Veuillez entrer un texte")

            client.db.set(`joindm_${message.guild.id}`, `${texte}`)
            message.reply(`Les personnes rejoignant le serveur receverons le message suivant:
\`${texte}\``)
        }

        if (remove) {
            client.db.delete(`joindm_${message.guild.id}`)
            message.reply(`Le joindm a été retiré`)
        }

        if (list) {
            let joindm = client.db.get(`joindm_${message.guild.id}`)
            if (!joindm) joindm = `\`Non configuré\``
            
           let Embed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle(`JoinDM`)
            .setDescription(`${joindm}`)
            .setFooter(footer)

            message.channel.send({ embeds: [Embed] })
        }


    }
}