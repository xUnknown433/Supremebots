const { Bot } = require('../../structures/client')
const request = require('request')
const { exec } = require('node:child_process')
const fs = require('fs')
const ms = require('enhanced-ms')

module.exports = {
    name: 'ready',

    /**
     * 
     * @param {Bot} client 
     */
    run: async (client) => {


        setInterval(() => {

        request(`http://localhost:3000/getbuyer/${client.user.id}`, async (err, res, body) => {
            let data = JSON.parse(body).body
        request('http://localhost:3000/gestion/version', async (error, response, body) => {
        let currentVersion = client.version;
        if (error) return console.log(error);
        let version = body;
        if (currentVersion === version) return;
        
        let updatedm = client.db.get(`updatedm`)
        if (updatedm === true) {
            client.users.cache.get(data).send(`La mise à jour \`${version}\` a été trouvé >>> mise à jour lancé`)
        } else {

        }
            client.user.setPresence({ status: 'invisible' })
            exec(`cd /home/perso/gestion/${client.user.id} && rm -r commands events structures && cd /home/perso/maj/gestion && cp -r * /home/perso/gestion/${client.user.id} && pm2 restart ${client.user.id}`, (err, stdout, stderr) => {})
            fs.writeFile(`version.json`, JSON.stringify({ version: version }), (err) => {
                if (err) console.log(err);
            })
        



    })
    })

    }, ms("30s"))

    }
} 