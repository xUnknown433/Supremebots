const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "vc",
    aliases: ["voicestats"],
    description: "Permet de voir les statistiques vocal du serveur",
    category: "utilitaire" ,
    usage: ["vc"],

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

const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'GUILD_VOICE');
const members = message.guild.members.cache.filter(m => !m.bot && m.voice.channelId
    != null);

let count = 0;
let muteCount = 0;
let streamingCount = 0;
let muteHeadSetCount = 0;
for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.filter(m => !m.bot).size;
for (const [id, member] of members) {
    if (member.voice.mute === true && member.voice.deaf === false) {
        muteCount += 1
    }
    if (member.voice.streaming === true) {
        streamingCount += 1
    }
    if (member.voice.deaf === true) {
        muteHeadSetCount += 1
    }
}

    let Embed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(`Statistiques vocales de ${message.guild.name}`)
    .setDescription(`
\`🔊\` **${count}** membres connectés
\`🔇\` **${muteCount}** membres mute
\`🔇\` **${muteHeadSetCount}** membres en sourdine
\`🎙\` **${streamingCount}** membres en streaming
`)

    message.channel.send({ embeds: [Embed] })
    }
}