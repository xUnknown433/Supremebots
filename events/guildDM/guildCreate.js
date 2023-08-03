const { Bot } = require('../../structures/client')

module.exports = {
    name: 'guildCreate',

    /**
     * 
     * @param {Bot} client 
     */
    run: async (client, guild) => {
       

        let buyers = client.config.buyers

        if (!buyers) buyers = []

        let canlogs = false;
        if (guild.members.cache.get(client.user.id).permissions.has("VIEW_AUDIT_LOG")) canlogs = true;

        let action = await guild.fetchAuditLogs({ limit: 1, type: "BOT_ADD" }).then(async (audit) => audit.entries.first());
        let executor = action.executor
        
    
        let message_canlogs = `J'ai rejoins le serveur \`${guild.name}\` (\`${guild.memberCount}\` membres, propriétaire: \`${client.users.cache.get(guild.ownerId).tag}\`)
J'ai été invité par \`${executor.tag}\` (\`${executor.id}\`)`;
        let message_nocanlogs = `J'ai rejoins le serveur \`${guild.name}\` (\`${guild.memberCount}\` membres, propriétaire: \`${client.users.cache.get(guild.ownerId).tag}\`)`;

        let message;
        if (canlogs === true) message = message_canlogs;
        if (canlogs === false) message = message_nocanlogs;

        buyers.forEach(async (buyerz) => {
            let buyer = client.users.cache.get(buyerz)
            buyer.send(message)
        })

        let own = client.db.get(`${client.user.id}.owner`)
        own?.map((user, i) => {
            client.users.cache.get(user).send(message)
        })

    

    }
}