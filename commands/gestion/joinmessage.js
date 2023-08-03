const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "joinmessage",
    aliases: [],
    description: "Permet de configurer le join dm",
    category: "gestion",
    usage: ["joinmessage", "joinmessage set <texte>", "joinmessage del"],
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
            let txt = texte.replace("{user.username}", message.author.username).replace("{user.username}", message.author.username).replace("{user.username}", message.author.username).replace("{user.username}", message.author.username).replace("{user.tag}", message.author.tag).replace("{user.tag}", message.author.tag).replace("{user.tag}", message.author.tag).replace("{user.tag}", message.author.tag).replace("{user.id}", message.author.id).replace("{user.id}", message.author.id).replace("{user.id}", message.author.id).replace("{user.id}", message.author.id).replace("{user.mention}", message.author).replace("{user.mention}", message.author).replace("{user.mention}", message.author).replace("{user.mention}", message.author).replace("{guild.name}", message.guild.name).replace("{guild.name}", message.guild.name).replace("{guild.name}", message.guild.name).replace("{guild.name}", message.guild.name).replace("{guild.memberCount}", message.guild.memberCount).replace("{guild.memberCount}", message.guild.memberCount).replace("{guild.memberCount}", message.guild.memberCount).replace("{guild.memberCount}", message.guild.memberCount).replace("{vanity.usesCount}", 129).replace("{vanity.usesCount}", 129).replace("{vanity.usesCount}", 129).replace("{vanity.usesCount}", 129).replace("{vanity.usesCount}", 129).replace("{vanity.usesCount}", 129).replace("{vanity.Url}", "vanity").replace("{vanity.Url}", "vanity").replace("{vanity.Url}", "vanity").replace("{vanity.Url}", "vanity").replace("{vanity.Url}", "vanity").replace("{vanity.Url}", "vanity")
            if(!texte) return message.reply("Veuillez entrer un texte")

            client.db.set(`joinmessage_${message.guild.id}`, `${texte}`)
            message.reply(`Join message configuré:
${txt}`)
        }

        if (remove) {
            client.db.delete(`joinmessage_${message.guild.id}`)
            message.reply(`Le joinmessage a été retiré`)
        }

        if (list) {
            let joinmessage = client.db.get(`joinmessage_${message.guild.id}`)
            if (!joinmessage) joinmessage = `\`Non configuré\``

           let Embed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle(`Joinmessage`)
            .setDescription(`${joinmessage.replace("{user.username}", message.author.username).replace("{user.username}", message.author.username).replace("{user.username}", message.author.username).replace("{user.username}", message.author.username).replace("{user.tag}", message.author.tag).replace("{user.tag}", message.author.tag).replace("{user.tag}", message.author.tag).replace("{user.tag}", message.author.tag).replace("{user.id}", message.author.id).replace("{user.id}", message.author.id).replace("{user.id}", message.author.id).replace("{user.id}", message.author.id).replace("{user.mention}", message.author).replace("{user.mention}", message.author).replace("{user.mention}", message.author).replace("{user.mention}", message.author).replace("{guild.name}", message.guild.name).replace("{guild.name}", message.guild.name).replace("{guild.name}", message.guild.name).replace("{guild.name}", message.guild.name).replace("{guild.memberCount}", message.guild.memberCount).replace("{guild.memberCount}", message.guild.memberCount).replace("{guild.memberCount}", message.guild.memberCount).replace("{guild.memberCount}", message.guild.memberCount).replace("{vanity.usesCount}", 129).replace("{vanity.usesCount}", 129).replace("{vanity.usesCount}", 129).replace("{vanity.usesCount}", 129).replace("{vanity.usesCount}", 129).replace("{vanity.usesCount}", 129).replace("{vanity.Url}", "vanity").replace("{vanity.Url}", "vanity").replace("{vanity.Url}", "vanity").replace("{vanity.Url}", "vanity").replace("{vanity.Url}", "vanity").replace("{vanity.Url}", "vanity")}`)
            .setFooter(footer)

            message.channel.send({ embeds: [Embed] })
        }


    }
}