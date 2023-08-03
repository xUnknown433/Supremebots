const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "banlist",
    description: "Permet de voir la liste des utilisateur banni",
    category: "moderation",
    usage: ["banlist"],

    /**
     * @param {bot} client
     * @param {Discord.Message} message
     * @param {String[]} args
     */

    run: async(client, message, args, color, prefix, footer, commandName) => {
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

    let banlist = await (await message.guild.bans.fetch()).map(u => `${u.user.tag} : \`${u.reason || 'Aucune raison'}\``).join('\n');
    if (banlist.length < 0) return message.channel.send(`Aucun utilisateur banni.`);

    let embed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(`Liste des utilisateurs bannis`)
    .setDescription(`Il y a ${await (await message.guild.bans.fetch()).size} utilisateur(s) banni(s).
    
${banlist}`)

    message.channel.send({ embeds: [embed] });
    
    }
}

