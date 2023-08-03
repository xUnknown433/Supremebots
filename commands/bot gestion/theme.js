const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "theme",
    aliases: ["couleur", "color"],
    description: "Permet de changer la couleur des embeds",
    category: "botcontrol",
    usage: ["theme <couleur>"],
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

        let colorz = args[0];
        if(!colorz) return;

        let colorzs_fr = {
            "rouge": "ff0000",
            "bleu": "0000ff",
            "vert": "00ff00",
            "jaune": "ffff00",
            "orange": "ffa500",
            "rose": "ffc0cb",
            "violet": "ee82ee",
            "gris": "808080",
            "blanc": "ffffff",
            "noir": "000000",
            "reset": client.color,
            "invisible": "#303434"
        }

        let colorzs_en = {
            "red": "ff0000",
            "blue": "0000ff",
            "green": "00ff00",
            "yellow": "ffff00",
            "orange": "ffa500",
            "pink": "ffc0cb",
            "purple": "ee82ee",
            "grey": "808080",
            "white": "ffffff",
            "black": "000000"
        }

        if(colorzs_fr[colorz]) colorz = colorzs_fr[colorz];
        if(colorzs_en[colorz]) colorz = colorzs_en[colorz];
        // if color is not in the two lists, check if it's a hex color
        if(!colorzs_fr[colorz] && !colorzs_en[colorz]) colorz = colorz.replace("#", "");

        client.db.set(`color_${message.guild.id}`, colorz);

        let Embed = new Discord.MessageEmbed()
        .setColor(colorz)
        .setTitle("Couleur du serveur mis à jour.")
        .setFooter(client.footer)

        message.channel.send({ embeds: [Embed] });
      
    
    }
}