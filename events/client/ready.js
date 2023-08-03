const { Bot } = require('../../structures/client')

module.exports = {
    name: 'ready',

    /**
     * 
     * @param {Bot} client 
     */
    run: async (client) => {
        console.clear()
        print(`>> Bot lancé
    > Nom: ${client.user.username}
    > ID: ${client.user.id}
    > Version: ${client.version}
    > Il y a ${client.commands.size} commandes`)
    }
} 