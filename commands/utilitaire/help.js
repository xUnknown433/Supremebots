const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    name: "help",
    aliases: [],
    description: "Permet de voir la liste des commandes du bot",
    category: "utilitaire",
    usage: ["help", "help [commande]", "help var welcome"],

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

        let utilitaire_commands = client.commands.filter(c => c.category === "utilitaire");
        let moderation_commands = client.commands.filter(c => c.category === "moderation");
        let log_commands = client.commands.filter(c => c.category === "logs");
        let gestion_commands = client.commands.filter(c => c.category === "gestion");
        let antiraid_commands = client.commands.filter(c => c.category === "antiraid");
        let backup_commands = client.commands.filter(c => c.category === "backup");
        let botcontrol_commands = client.commands.filter(c => c.category === "botcontrol");
        let propriotaire_commands = client.commands.filter(c => c.category === "proprio");
        let buyer_commands = client.commands.filter(c => c.category === "buyers");


        let utilitaire = new Discord.MessageEmbed()
        .setTitle(`Utilitaire`)
        .setDescription(`*Les paramètres mis entre <> sont obligatoires contrairement aux paramètres mis entre [] qui sont eux facultatifs*`)
        .setColor(color)
        .setFooter(footer)
        utilitaire_commands.forEach(c => {
            utilitaire.addField(`\`${prefix}${c.name}\``, `${c.description}\nUsages : ${c.usage.map(c => `\`${prefix}${c}\``).join(', ')}`)
        })

        let moderation = new Discord.MessageEmbed()
        .setTitle(`Modération`)
        .setDescription(`*Les paramètres mis entre <> sont obligatoires contrairement aux paramètres mis entre [] qui sont eux facultatifs*`)
        .setColor(color)
        .setFooter(footer)
        moderation_commands.forEach(c => {
            moderation.addField(`\`${prefix}${c.name}\``, `${c.description}\nUsages : ${c.usage.map(c => `\`${prefix}${c}\``).join(', ')}`)
        })

        let logs = new Discord.MessageEmbed()
        .setTitle(`Logs`)
        .setDescription(`*Les paramètres mis entre <> sont obligatoires contrairement aux paramètres mis entre [] qui sont eux facultatifs*`)
        .setColor(color)
        .setFooter(footer)
        log_commands.forEach(c => {
            logs.addField(`\`${prefix}${c.name}\``, `${c.description}\nUsages : ${c.usage.map(c => `\`${prefix}${c}\``).join(', ')}`)
        })

        let gestion = new Discord.MessageEmbed()
        .setTitle(`Gestion`)
        .setDescription(`*Les paramètres mis entre <> sont obligatoires contrairement aux paramètres mis entre [] qui sont eux facultatifs*`)
        .setColor(color)
        .setFooter(footer)
        gestion_commands.forEach(c => {
            gestion.addField(`\`${prefix}${c.name}\``, `${c.description}\nUsages : ${c.usage.map(c => `\`${prefix}${c}\``).join(', ')}`)
        })

        let antiraid = new Discord.MessageEmbed()
        .setTitle(`Anti-Raid`)
        .setDescription(`*Les paramètres mis entre <> sont obligatoires contrairement aux paramètres mis entre [] qui sont eux facultatifs*`)
        .setColor(color)
        .setFooter(footer)
        antiraid_commands.forEach(c => {
            antiraid.addField(`\`${prefix}${c.name}\``, `${c.description}\nUsages : ${c.usage.map(c => `\`${prefix}${c}\``).join(', ')}`)
        })

        let backup = new Discord.MessageEmbed()
        .setTitle(`Backup`)
        .setDescription(`*Les paramètres mis entre <> sont obligatoires contrairement aux paramètres mis entre [] qui sont eux facultatifs*`)
        .setColor(color)
        .setFooter(footer)
        backup_commands.forEach(c => {
            backup.addField(`\`${prefix}${c.name}\``, `${c.description}\nUsages : ${c.usage.map(c => `\`${prefix}${c}\``).join(', ')}`)
        })

        let botcontrol = new Discord.MessageEmbed()
        .setTitle(`Bot Control`)
        .setDescription(`*Les paramètres mis entre <> sont obligatoires contrairement aux paramètres mis entre [] qui sont eux facultatifs*`)
        .setColor(color)
        .setFooter(footer)
        botcontrol_commands.forEach(c => {
            botcontrol.addField(`\`${prefix}${c.name}\``, `${c.description}\nUsages : ${c.usage.map(c => `\`${prefix}${c}\``).join(', ')}`)
        })

        let propriotaire = new Discord.MessageEmbed()
        .setTitle(`Propriétaire`)
        .setDescription(`*Les paramètres mis entre <> sont obligatoires contrairement aux paramètres mis entre [] qui sont eux facultatifs*`)
        .setColor(color)
        .setFooter(footer)
        propriotaire_commands.forEach(c => {
            propriotaire.addField(`\`${prefix}${c.name}\``, `${c.description}\nUsages : ${c.usage.map(c => `\`${prefix}${c}\``).join(', ')}`)
        })

        let buyer = new Discord.MessageEmbed()
        .setTitle(`Buyer`)
        .setDescription(`*Les paramètres mis entre <> sont obligatoires contrairement aux paramètres mis entre [] qui sont eux facultatifs*`)
        .setColor(color)
        .setFooter(footer)
        buyer_commands.forEach(c => {
            buyer.addField(`\`${prefix}${c.name}\``, `${c.description}\nUsages : ${c.usage.map(c => `\`${prefix}${c}\``).join(', ')}`)
        })
        




        let row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('select')
                    .setPlaceholder('Séléctionnez une page du help')
                    .addOptions([
                        {
                            label: 'Utilitaires',
                            description: 'Affiche les commandes utilitaires',
                            value: 'utilitaires',
                        },
                        {
                            label: 'Modération',
                            description: 'Affiche les commandes de modération',
                            value: 'moderation',
                        },
                        {
                            label: 'Logs',
                            description: 'Affiche les commandes de logs',
                            value: 'logs',
                        },
                        {
                            label: 'Gestion',
                            description: 'Affiche les commandes de gestion',
                            value: 'gestion',
                        },
                        {
                            label: 'Anti-Raid',
                            description: 'Affiche les commandes anti-raid',
                            value: 'antiraid',
                        },
                        {
                            label: 'Backup',
                            description: 'Affiche les commandes de backup',
                            value: 'backup',
                        },
                        {
                            label: 'Bot Control',
                            description: 'Affiche les commandes de bot control',
                            value: 'botcontrol',
                        },
                        {
                            label: 'Propriétaire',
                            description: 'Affiche les commandes de propriétaire',
                            value: 'propriotaire',
                        },
                        {
                            label: 'Buyer',
                            description: 'Affiche les commandes de buyer',
                            value: 'buyer',
                        },
                    

                    ]),
            );

    await message.channel.send({ embeds: [utilitaire], components: [row] }).then(async msg => {
        client.db.set(`${msg.guild.id}_${msg.id}_author`, message.author.id) 
    })

    } else if (args[0] && args[0] !== "var") {
        let command = client.commands.get(args[0].toLowerCase()) || client.commands.find(c => c.aliases && c.aliases.includes(args[0].toLowerCase()));
        if (!command) return message.reply('Cette commande n\'existe pas');
        let aliases = command.aliases.length > 0 ? command.aliases.map(a => `\`${prefix}${a}\``).join("\n") : "Aucun";
        let embed = new Discord.MessageEmbed()
            .setTitle(`Commande ${command.name}`)
            .setDescription(`${command.description}`)
            .setColor(color)
            .setFooter(footer)
            .addField(`Utilisation(s)`, `${command.usage.map(a => `\`${prefix}${a}\``).join("\n")}`)
            .addField(`Aliases`, `${aliases}`)
        message.reply({ embeds: [embed] });
    } else if (args[0] === "var" && args[1] === "welcome") {
        let embed = new Discord.MessageEmbed()
         .setTitle(`Variables`)
         .setDescription(`Compatible avec : Messages de bienvenue`)
         .setColor(color)
         .setFooter(footer)
         .addField(`**{user.username}**`, `Affiche le pseudo du membre invité\n\`Exemple :\` ${message.author}`, true)
         .addField(`**{user.id}**`, `Affiche l'ID du membre invité\n\`Exemple : ${message.author.id}\``, true)
         .addField(`**{user.tag}**`, `Affiche le tag du membre invité\n\`Exemple : ${message.author.tag}\``, true)
         .addField(`**{user.mention}**`, `Affiche la mention du membre invité\n\`Exemple :\` ${message.author}`)
         .addField(`**{guild.name}**`, `Affiche le  du serveur\n\`Exemple : ${message.guild.name}\``, true)
         .addField(`**{guild.memberCount}**`, `Affiche le nombre de membres du serveur\n\`Exemple : ${message.guild.memberCount}\``, true)
         .addField(`**{vanity.usesCount}**`, `Affiche le nombre d'utilisations du vanity du serveur\n\`Exemple : ${message.guild.vanityURLUses || 0}\``, true)
         .addField(`**{vanity.Url}**`, `Affiche le code vanity du serveur\n\`Exemple : ${message.guild.vanityURLCode || "none"}\``, true)
         
        message.channel.send({ embeds: [embed] });
    } 


    }
}