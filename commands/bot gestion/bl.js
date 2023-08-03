const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const request = require('request');

module.exports = {
    name: "bl",
    aliases: ["blacklist"],
    description: "Permet de gérer la blacklist",
    category: "botcontrol",
    usage: ["bl <ID>", "bl clear", "bl"],
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
        
    let wlz = client.db.get(`bl.${client.user.id}`) || "Aucun";
    let wl;
    if (wlz !== "Aucun") wl = wlz?.map(a => `<@${a}>`).join("\n");
    if (wlz === "Aucun") wl = "Aucun";

    let embed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(`Blacklist`)
    .setDescription(`${wl}`)
    .setFooter(footer)
    message.channel.send({ embeds: [embed] });

    } 

    if (args[0] && args[0] !== "clear") {

        const id = args[0]
        request.get(`https://discordapp.com/api/users/${id}`, {headers: {'Authorization': `Bot ${client.config.token}`}}, async (err, res, body) => {
            
        if(err) return message.channel.send(`Cet utilisateur n'existe pas ou est introuvable.`);
        let member = JSON.parse(body);

        if (member.username === undefined) return message.channel.send(`Cet utilisateur n'existe pas ou est introuvable.`);
        if (client.db.get(`owner_${member.id}`) === true) return message.channel.send(`Impossible de blacklist un owner`)
        if (client.db.get(`blmd_${client.user.id}_${member.id}`) === true) return message.channel.send(`${member.username} est déjà blacklist`)

        client.db.push(`bl.${client.user.id}`, member.id)
        client.db.set(`blmd_${client.user.id}_${member.id}`, true)

        await message.channel.send(`${member.username} a été ajouté à la blacklist
Il a été kick de mes serveurs, il ne pourra plus rejoindre de serveur contenant le bot.`)

        message.guild.members.cache.get(member.id).kick({reason: `Blacklist`})

        client.guilds.cache.forEach(g => {
                g.members.cache.get(member.id)?.kick({reason: `Blacklist`})
        })

    })



    } else if(args[0] === "clear") {
        let data = await client.db.all().filter(data => data.ID.startsWith(`blmd_${client.user.id}`));
        client.db.set(`bl.${client.user.id}`, [])
        message.channel.send(`${data.length === undefined||null ? 0:data.length} ${data.length > 1 ? "personnes ont été supprimées":"personne a été supprimée"} de la blacklist`)

   
        let count = 0;
        for(let i = 0; i < data.length; i++) {
          client.db.delete(data[i].ID);
          count++;
        }    

    }


    }
}
