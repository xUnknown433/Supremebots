const { Bot } = require('../../structures/client')
const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    name: 'interactionCreate',

    /**
     * 
     * @param {Bot} client 
     */
    run: async (client, interaction) => {

    if (!interaction.isSelectMenu() && interaction.isCommand()) return

    if (interaction.customId !== 'select') return

    let color = client.db.get(`color_${interaction.guildId}`) || client.color
    let prefix = client.db.get(`prefix_${interaction.guildId}`) || client.prefix
    let footer = client.footer


    if (client.db.get(`${interaction.guildId}_${interaction.message.id}_author`) !== interaction.user.id) return interaction.reply({ content: `Vous ne pouvez pas utiliser ce menu.`, ephemeral: true })
    
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
            utilitaire.addField(`\`${prefix}${c.name}\``, `${c.description}`)
        })

        let moderation = new Discord.MessageEmbed()
        .setTitle(`Modération`)
        .setDescription(`*Les paramètres mis entre <> sont obligatoires contrairement aux paramètres mis entre [] qui sont eux facultatifs*`)
        .setColor(color)
        .setFooter(footer)
        moderation_commands.forEach(c => {
            moderation.addField(`\`${prefix}${c.name}\``, `${c.description}`)
        })

        let logs = new Discord.MessageEmbed()
        .setTitle(`Logs`)
        .setDescription(`*Les paramètres mis entre <> sont obligatoires contrairement aux paramètres mis entre [] qui sont eux facultatifs*`)
        .setColor(color)
        .setFooter(footer)
        log_commands.forEach(c => {
            logs.addField(`\`${prefix}${c.name}\``, `${c.description}`)
        })

        let gestion = new Discord.MessageEmbed()
        .setTitle(`Gestion`)
        .setDescription(`*Les paramètres mis entre <> sont obligatoires contrairement aux paramètres mis entre [] qui sont eux facultatifs*`)
        .setColor(color)
        .setFooter(footer)
        gestion_commands.forEach(c => {
            gestion.addField(`\`${prefix}${c.name}\``, `${c.description}`)
        })

        let antiraid = new Discord.MessageEmbed()
        .setTitle(`Anti-Raid`)
        .setDescription(`*Les paramètres mis entre <> sont obligatoires contrairement aux paramètres mis entre [] qui sont eux facultatifs*`)
        .setColor(color)
        .setFooter(footer)
        antiraid_commands.forEach(c => {
            antiraid.addField(`\`${prefix}${c.name}\``, `${c.description}`)
        })

        let backup = new Discord.MessageEmbed()
        .setTitle(`Backup`)
        .setDescription(`*Les paramètres mis entre <> sont obligatoires contrairement aux paramètres mis entre [] qui sont eux facultatifs*`)
        .setColor(color)
        .setFooter(footer)
        backup_commands.forEach(c => {
            backup.addField(`\`${prefix}${c.name}\``, `${c.description}`)
        })

        let botcontrol = new Discord.MessageEmbed()
        .setTitle(`Bot Control`)
        .setDescription(`*Les paramètres mis entre <> sont obligatoires contrairement aux paramètres mis entre [] qui sont eux facultatifs*`)
        .setColor(color)
        .setFooter(footer)
        botcontrol_commands.forEach(c => {
            botcontrol.addField(`\`${prefix}${c.name}\``, `${c.description}`)
        })

        let propriotaire = new Discord.MessageEmbed()
        .setTitle(`Propriétaire`)
        .setDescription(`*Les paramètres mis entre <> sont obligatoires contrairement aux paramètres mis entre [] qui sont eux facultatifs*`)
        .setColor(color)
        .setFooter(footer)
        propriotaire_commands.forEach(c => {
            propriotaire.addField(`\`${prefix}${c.name}\``, `${c.description}`)
        })

        let buyer = new Discord.MessageEmbed()
        .setTitle(`Buyer`)
        .setDescription(`*Les paramètres mis entre <> sont obligatoires contrairement aux paramètres mis entre [] qui sont eux facultatifs*`)
        .setColor(color)
        .setFooter(footer)
        buyer_commands.forEach(c => {
            buyer.addField(`\`${prefix}${c.name}\``, `${c.description}`)
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

        switch (interaction.values[0]) {
            case 'utilitaires':
                 interaction.update({embeds: [utilitaire]})
                break;
            case 'moderation':
                 interaction.update({embeds: [moderation]})
                break;
            case 'logs':
                 interaction.update({embeds: [logs]})
                break;
            case 'gestion':
                 interaction.update({embeds: [gestion]})
                break;
            case 'antiraid':
                 interaction.update({embeds: [antiraid]})
                break;
            case 'backup':
                 interaction.update({embeds: [backup]})
                break;
            case 'botcontrol':
                 interaction.update({embeds: [botcontrol]})
                break;
            case 'propriotaire':
                 interaction.update({embeds: [propriotaire]})
                break;
            case 'buyer':
                 interaction.update({embeds: [buyer]})
                break;
            default:
                return;
        }
                
        
    

    }
} 