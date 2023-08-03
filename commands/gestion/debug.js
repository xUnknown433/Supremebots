const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "debug",
    aliases: ["debugstaff"],
    description: "Permet de créer un salon réservé aux staffs de SupremeBots",
    category: "gestion",
    usage: ["debug"],

    /**
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {Array<>} args 
     * @param {string} commandName 
     */

    run: async (client, message, args, color, prefix, footer, commandName) => {

let pass = false

let staff = client.staff

if(!staff.includes(message.author.id)) pass = true;

if (pass === false) return message.channel.send(`Vous n'avez pas la permission d'utiliser cette commande.`)




        
    }
}