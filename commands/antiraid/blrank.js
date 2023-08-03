const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "blrank",
    aliases: [],
    description: "Permet d'ajouter au blrank un utilisateur",
    category: "antiraid",
    usage: ["blrank <utilisateur>", "blrank clear", "blrank"],

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



    if (!args[0]) {

    let wl = client.db.get(`blranks.${message.guild.id}`)?.join('\n') || "Aucun";
    if (wl !== "Aucun") wl = `<@${wl}>`;

    let embed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(`Blrank`)
    .setDescription(wl)
    .setFooter(footer)
    message.channel.send({ embeds: [embed] });

    } 

    if (message.mentions.members.size > 0 || client.users.cache.get(args[0])) {

        let member = message.mentions.members.first()

        client.db.push(`blranks.${message.guild.id}`, member.id)
        client.db.set(`blrankmd_${message.guild.id}_${member.id}`, true)
        message.channel.send(`${member.user.username} est désormais blrank`)

    } else if(args[0] === "clear") {
        let data = await client.db.all().filter(data => data.ID.startsWith(`blrankmd_${message.guild.id}`));
        client.db.delete(`blrank.${message.guild.id}`)
        message.channel.send(`${data.length === undefined||null ? 0:data.length} ${data.length > 1 ? "personnes ont été supprimées":"personne a été supprimée"} de la liste blrank`)

   
        let count = 0;
        for(let i = 0; i < data.length; i++) {
          client.db.delete(data[i].ID);
          count++;
        }    
 
    } else if(args[0] === "on") {
        if(client.db.get(`blrank.${message.guild.id}`) === "on") return message.channel.send(`Le blrank est déjà activé.`)
        client.db.set(`blrank.${message.guild.id}`, "on")
        message.channel.send(`Le système de blrank est activé`)
    } else if(args[0] === "off") {
        if(!client.db.get(`blrank.${message.guild.id}`)) return message.channel.send(`Le blrank est déjà désactivé.`)
        client.db.delete(`blrank.${message.guild.id}`)
        message.channel.send(`Le système de blrank est désactivé`)
    } else if(args[0] === "max") {
        if(client.db.get(`blrank.${message.guild.id}`) === "max") return message.channel.send(`Le blrank est déjà désactivé.`)
        client.db.set(`blrank.${message.guild.id}`, "max")
        message.channel.send(`Le système de blrank est activé`)
    } else if(args[0] === "type" && args[1] === "danger") {
        if(client.db.get(`blrank_type_${message.guild.id}`) === "danger") return message.channel.send(`Le blrank est déjà désactivé.`)
        client.db.set(`blrank_type_${message.guild.id}`, "danger")
        message.channel.send(`Le blrank retirera seulement les rôles dangereux`)
    } else if(args[0] === "type" && args[1] === "all") {
        if(client.db.get(`blrank_type_${message.guild.id}`) === "all") return message.channel.send(`Le blrank est déjà désactivé.`)
        client.db.set(`blrank_type_${message.guild.id}`, "all")
        message.channel.send(`Le blrank retirera tous les rôles`)
    }



    }
}