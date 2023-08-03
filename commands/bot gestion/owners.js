const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "owners",
    aliases: [],
    description: "Permet de lister ou de supprimer les owners",
    category: "buyers",
    usage: ["owners", "owners clear"],
    /**
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {Array<>} args 
     * @param {string} commandName 
     */

    run: async (client, message, args, color, prefix, footer, commandName) => {

        if(!client.config.buyers.includes(message.author.id)) return message.channel.send(`Vous n'avez pas la permission d'utiliser cette commande.`)

    if (!args[0]) {
    let wlz = client.db.get(`${client.user.id}.owner`) || "Aucun";
    let wl;
    if (wlz !== "Aucun") wl = wlz.map(x => `<@${x}>`).join("\n");
    if (wlz === "Aucun") wl = "Aucun";

    let embed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(`Owners`)
    .setDescription(wl)
    .setFooter(footer)
    message.channel.send({ embeds: [embed] });

    } else if(args[0] === "clear") {
        let data = await client.db.all().filter(data => data.ID.startsWith(`owner_`));
        client.db.delete(`${client.user.id}.owner`);
        message.channel.send(`${data.length === undefined||null ? 0:data.length} ${data.length > 1 ? "personnes ont été supprimées":"personne a été supprimée"} de la liste des owners`)

   
        let count = 0;
        for(let i = 0; i < data.length; i++) {
          client.db.delete(data[i].ID);
          count++;
        }    

    }

    }
}