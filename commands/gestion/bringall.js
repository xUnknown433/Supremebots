const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: "bringall",
    aliases: [],
    description: "Permet de faire venir tous les membres en vocal du serveur dans un channel",
    category: "gestion",
    usage: ["bringall [channel]"],

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

        let channelInput = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.member.voice.channel;
        if (!channelInput) return message.channel.send(`Vous devez être dans un salon vocal pour utiliser cette commande ou sinon en mentionner un.`)
        
    if (channelInput.type !== 'GUILD_VOICE') return;

        const channels = message.guild.channels.cache.filter(ch => ch.id !== channelInput.id && ch.isText() && ch.members.size > 0)
        for await(const [_, channel] of channels)
            for await(const [_, member] of channel.members) {
                await member.voice.setChannel(channelInput, `Bringall by ${message.author.tag}`).catch(() => {
                })
            }

        message.channel.send(`Tout les membres ont été déplacé vers ${channelInput}`)
        


    }
}