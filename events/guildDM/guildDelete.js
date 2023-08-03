const { Bot } = require('../../structures/client')

module.exports = {
    name: 'guildDelete',

    /**
     * 
     * @param {Bot} client 
     */
    run: async (client, guild) => {
       

        let buyers = client.config.buyers

        if (!buyers) buyers = []
    
        let message_canlogs = `J'ai quitté le serveur \`${guild.name}\` (\`${guild.memberCount}\` membres, propriétaire: \`${client.users.cache.get(guild.ownerId).tag}\`)`;

        buyers.forEach(async (buyerz) => {
            let buyer = client.users.cache.get(buyerz)
            buyer.send(message_canlogs)
        })

        let own = client.db.get(`${client.user.id}.owner`)
        own?.map((user, i) => {
            client.users.cache.get(user).send(message_canlogs)
        })

    

    }
}