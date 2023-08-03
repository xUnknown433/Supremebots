const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "soutien",
    aliases: [],
    description: "Permet de gérer les soutiens",
    category: "gestion",
    usage: ["soutien", "soutien add <role> <texte>", "soutien remove <numéro>"],
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
        let add = args[0] === "add"
        let remove = args[0] === "remove"
        let list = !args[0]

        if (add) {
            let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(r => r.name === args[1])
            if(!role) return message.reply("Veuillez mentionner un rôle")
            let texte = args.slice(2).join(" ")
            if(!texte) return message.reply("Veuillez entrer un texte")

            client.db.push(`soutien_${message.guild.id}`, {
                role: role.id,
                texte: texte
            })

            message.reply(`Les personnes possédant le statut \`${texte}\` recevront le rôle \`${role.name}\` **automatiquement**`)
        }

        if (remove) {
            let number = args[1] - 1;

            if (isNaN(number)) return;
            let soutienz = client.db.get(`soutien_${message.guild.id}`) || []
            soutienz.map(async (soutien, i) => {
                if (i === number) {
                    client.db.set(`soutien_${message.guild.id}`, soutienz.filter(soutienc => soutienc.role !== soutien.role && soutienc.texte !== soutien.texte))
                    message.reply(`Le statut \`${soutien.texte}\` a été supprimé`)
                }
            })
        }

        if (list) {
            let soutien = client.db.get(`soutien_${message.guild.id}`)
            if (!soutien) soutien = []
            
           let Embed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle(`Soutien`)
            .setDescription(`${soutien.map((s, i) => `${i+1} - \`${s.texte}\` => <@&${s.role}>`).join("\n")}`)
            .setFooter(footer)

            message.channel.send({ embeds: [Embed] })
        }


    }
}