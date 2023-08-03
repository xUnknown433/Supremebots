const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "joinrole",
    aliases: [],
    description: "Permet de gérer les joinroles",
    category: "gestion",
    usage: ["joinrole add <rôle>", "joinrole remove <rôle>", "joinrole list"],

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



        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])


        let add = args[0] === "add"
        let remove = args[0] === "remove"
        let list = args[0] === "list"

        if (add) {
            if (!role) return;
            client.db.set(`joinrole_${message.guild.id}_${role.id}`, true)
            message.reply(`Le rôle ${role.name} est désormais un joinrole`)
        }

        if (remove) {
            if (!role) return;
            client.db.delete(`joinrole_${message.guild.id}_${role.id}`)
            message.reply(`Le rôle ${role.name} n'est plus un joinrole`)
        }

        if (list) {

            let roles = []

            message.guild.roles.cache.forEach(rol => {
                if (client.db.get(`joinrole_${message.guild.id}_${rol.id}`) === true) {
                    roles.push(rol.id)
                }
            })


            if (roles.length === 0) {
                message.reply("Aucun joinrole")
            }

            if (roles.length > 0) {
                let Embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setTitle(`Join roles`)
                    .setDescription(`Il y a actuellement **${roles.length}** joinrole

${roles.length <= 0 ? "Aucun" : roles.map(ru => `<@&${ru}>`).join("\n")}`)
                    .setFooter(footer)
                message.channel.send({ embeds: [Embed] })
            }
        }



    }
}