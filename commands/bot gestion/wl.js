const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "wl",
    aliases: ["whitelist"],
    description: "Permet de gérer la whitelist",
    category: "botcontrol",
    usage: ["wl <utilisateur>", "wl clear", "wl"],
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

    let wlz = client.db.get(`wl.${message.guild.id}`) || "Aucun";
    let wl;
    if (wlz !== "Aucun") wl = wlz?.map(a => `<@${a}>`).join("\n");
    if (wlz === "Aucun") wl = "Aucun";

    let embed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(`Whitelist`)
    .setDescription(`${wl}`)
    .setFooter(footer)
    message.channel.send({ embeds: [embed] });

    } 

    if (message.mentions.members.size > 0 || client.users.cache.get(args[0])) {

        let member = message.mentions.members.first()

        client.db.push(`wl.${message.guild.id}`, member.id)
        client.db.set(`wlmd_${message.guild.id}_${member.id}`, true)
        message.channel.send(`${member.user.username} a été ajouté à la whitelist`)

    } else if(args[0] === "clear") {
        let data = await client.db.all().filter(data => data.ID.startsWith(`wlmd_${message.guild.id}`));
        client.db.set(`wl.${message.guild.id}`, [])
        message.channel.send(`${data.length === undefined||null ? 0:data.length} ${data.length > 1 ? "personnes ont été supprimées":"personne a été supprimée"} de la whitelist`)

   
        let count = 0;
        for(let i = 0; i < data.length; i++) {
          client.db.delete(data[i].ID);
          count++;
        }    

    }


    }
}