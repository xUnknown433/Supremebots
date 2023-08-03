const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "joinsettings",
    aliases: [],
    description: "Permet de gérer les paramètres de join du serveur",
    category: "gestion",
    usage: ["joinsettings"],

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


    let channels = []

    message.guild.channels.cache.forEach(channel => {
        if (client.db.get(`ghostjoin_${channel.id}`) === true) {
            channels.push(channel.id)
        }
    })

    let joinroles = []

    message.guild.roles.cache.forEach(rol => {
        if (client.db.get(`joinrole_${message.guild.id}_${rol.id}`) === true) {
            joinroles.push(rol.id)
        }
    })

    let msg_welcomos = client.db.get(`joinmessage_${message.guild.id}`)
    let txt = msg_welcomos?.replace("{user.username}", message.author.username).replace("{user.username}", message.author.username).replace("{user.username}", message.author.username).replace("{user.username}", message.author.username).replace("{user.tag}", message.author.tag).replace("{user.tag}", message.author.tag).replace("{user.tag}", message.author.tag).replace("{user.tag}", message.author.tag).replace("{user.id}", message.author.id).replace("{user.id}", message.author.id).replace("{user.id}", message.author.id).replace("{user.id}", message.author.id).replace("{user.mention}", message.author).replace("{user.mention}", message.author).replace("{user.mention}", message.author).replace("{user.mention}", message.author).replace("{guild.name}", message.guild.name).replace("{guild.name}", message.guild.name).replace("{guild.name}", message.guild.name).replace("{guild.name}", message.guild.name).replace("{guild.memberCount}", message.guild.memberCount).replace("{guild.memberCount}", message.guild.memberCount).replace("{guild.memberCount}", message.guild.memberCount).replace("{guild.memberCount}", message.guild.memberCount).replace("{vanity.usesCount}", 129).replace("{vanity.usesCount}", 129).replace("{vanity.usesCount}", 129).replace("{vanity.usesCount}", 129).replace("{vanity.usesCount}", 129).replace("{vanity.usesCount}", 129).replace("{vanity.Url}", "vanity").replace("{vanity.Url}", "vanity").replace("{vanity.Url}", "vanity").replace("{vanity.Url}", "vanity").replace("{vanity.Url}", "vanity").replace("{vanity.Url}", "vanity")
        
    let Embed = new Discord.MessageEmbed()
        
        .setColor(color)
        .setTitle(`Join settings de ${message.guild.name}`)
        .addField("MP de bienvenue", `${!client.db.get(`joindm_${message.guild.id}`) ? "Non configuré" : `${client.db.get(`joindm_${message.guild.id}`)}`}`, true)
        .addField(`Message de bienvenue`, `${!client.db.get(`joinmessage_${message.guild.id}`) ? "Aucun" : txt}`, true)
        .addField(`Channel de bienvenue`, `${!message.guild.channels.cache.get(client.db.get(`joinchannel_${message.guild.id}`)) ? "Aucun" : `${message.guild.channels.cache.get(client.db.get(`joinchannel_${message.guild.id}`))}`}`, true)
        .addField("Ghost join", `${channels.length <= 0 ? "Aucun" : channels.map(channel => `<#${channel}>`).join("\n")}`, true)
        .addField(`Rôles membre`, `${joinroles.length <= 0 ? "Aucun" : joinroles.map(channel => `<@&${channel}>`).join("\n")}`, true)
        .setDescription(`**__Commandes de configuration__**:
\`${prefix}help ghostjoin\`
\`${prefix}help joindm\`
\`${prefix}help joinmessage\`
\`${prefix}help joinchannel\`
\`${prefix}help joinrole\`
\`${prefix}help var welcome\``)
        .setFooter(footer)

    message.channel.send({ embeds: [Embed] })



        



    }
}