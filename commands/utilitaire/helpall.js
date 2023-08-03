const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    name: "helpall",
    aliases: [],
    description: "Permet de voir la liste des commandes triés par permission",
    category: "utilitaire",
    usage: ["helpall"],

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


        if(!args[0]) {

        let perm_public = []
        client.commands.forEach(async (m) => {
            if (client.db.get(`perm_${m.name}.${message.guild.id}`) === "public") {
                perm_public.push(m.name)
            }
        })

        let perm_1 = []
        client.commands.forEach(async (m) => {
            if (client.db.get(`perm_${m.name}.${message.guild.id}`) === "1") {
                perm_1.push(m.name)
            }
        })
    
        let perm_2 = []
        client.commands.forEach(async (m) => {
            if (client.db.get(`perm_${m.name}.${message.guild.id}`) === "2") {
                perm_2.push(m.name)
            }
        })

        let perm_3 = []
        client.commands.forEach(async (m) => {
            if (client.db.get(`perm_${m.name}.${message.guild.id}`) === "3") {
                perm_3.push(m.name)
            }
        })

        let perm_4 = []
        client.commands.forEach(async (m) => {
            if (client.db.get(`perm_${m.name}.${message.guild.id}`) === "4") {
                perm_4.push(m.name)
            }
        })

        let perm_5 = []
        client.commands.forEach(async (m) => {
            if (client.db.get(`perm_${m.name}.${message.guild.id}`) === "5") {
                perm_5.push(m.name)
            }
        })

        let perm_public_embed = new Discord.MessageEmbed()
        .setTitle(`Permission publique`)
        .setColor(color)
        .setFooter(footer)
        .setDescription(`${perm_public.length > 0 ? perm_public.map(ziak => `\`${prefix}${ziak}\``).join("\n") : "Aucune commande"}`)
       
        let perm_1_embed = new Discord.MessageEmbed()
        .setTitle(`Permission 1`)
        .setColor(color)
        .setFooter(footer)
        .setDescription(`${perm_1.length > 0 ? perm_1.map(ziak => `\`${prefix}${ziak}\``).join("\n") : "Aucune commande"}`)
       
        let perm_2_embed = new Discord.MessageEmbed()
        .setTitle(`Permission 2`)
        .setColor(color)
        .setFooter(footer)
        .setDescription(`${perm_2.length > 0 ? perm_2.map(ziak => `\`${prefix}${ziak}\``).join("\n") : "Aucune commande"}`)
       
        let perm_3_embed = new Discord.MessageEmbed()
        .setTitle(`Permission 3`)
        .setColor(color)
        .setFooter(footer)
        .setDescription(`${perm_3.length > 0 ? perm_3.map(ziak => `\`${prefix}${ziak}\``).join("\n") : "Aucune commande"}`)
       
        let perm_4_embed = new Discord.MessageEmbed()
        .setTitle(`Permission 4`)
        .setColor(color)
        .setFooter(footer)
        .setDescription(`${perm_4.length > 0 ? perm_4.map(ziak => `\`${prefix}${ziak}\``).join("\n") : "Aucune commande"}`)
       
        let perm_5_embed = new Discord.MessageEmbed()
        .setTitle(`Permission 5`)
        .setColor(color)
        .setFooter(footer)
        .setDescription(`${perm_5.length > 0 ? perm_5.map(ziak => `\`${prefix}${ziak}\``).join("\n") : "Aucune commande"}`)
       

        let row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('selecthelpall')
                    .setPlaceholder('Séléctionnez une page du help')
                    .addOptions([
                        {
                            label: 'Permission publique',
                            description: 'Affiche les commandes associés à la permission publique',
                            value: 'perm_help_public',
                        },
                        {
                            label: 'Permission 1',
                            description: 'Affiche les commandes associés à la permission 1',
                            value: 'perm_help_1',
                        },
                        {
                            label: 'Permission 2',
                            description: 'Affiche les commandes associés à la permission 2',
                            value: 'perm_help_2',
                        },
                        {
                            label: 'Permission 3',
                            description: 'Affiche les commandes associés à la permission 3',
                            value: 'perm_help_3',
                        },
                        {
                            label: 'Permission 4',
                            description: 'Affiche les commandes associés à la permission 4',
                            value: 'perm_help_4',
                        },
                        {
                            label: 'Permission 5',
                            description: 'Affiche les commandes associés à la permission 5',
                            value: 'perm_help_5',
                        },
                    ]),
            );

    await message.channel.send({ embeds: [perm_public_embed], components: [row] }).then(async msg => {
        client.db.set(`helpall_${msg.guild.id}_${msg.id}_author`, message.author.id) 
    })
    
    } 


    }
}