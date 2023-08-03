const { Bot } = require('../../structures/client')
const randomstring = require('randomstring')
const fs = require('fs')
const Discord = require('discord.js')
const request = require('request')
const ms = require("enhanced-ms")
const { exec } = require('node:child_process')

module.exports = {
    name: 'ready',

    /**
     * 
     * @param {Bot} client 
     */
    run: async (client) => {
       
        request(`http://localhost:3000/getbuyer/${client.user.id}`, async (err, res, body) => {
            let data = JSON.parse(body).body

        request.get(`http://localhost:3000/getbot/${client.user.id}`, (err, res, body) => {
            if (err) return client.destroy()
            if (body === "Bot does not exist") {
                client.destroy()
                exec(`pm2 stop ${client.user.id} && pm2 save`, (err, stdout, stderr) => {})
                console.log(`Violation has been detected, fraudulent bot has been destroyed.`)
                return
            }
            const bot = JSON.parse(body).body
            if (bot.time - Date.now() <= 0) {
            client.users.cache.get(data)?.send(`Ce bot est arrivé à expiration, pour le renouveler mentionnez un administrateur dans votre channel privé`).then(async () => {
                client.destroy()
               exec(`pm2 stop ${client.user.id} && pm2 save`, (err, stdout, stderr) => {})
                
                console.log(`Expired bot has been destroyed.`)
            })
            }
        })
        


        request.get(`http://localhost:3000/gestion/version`, (err, res, body) => {
            if (err) return;
            if (body !== client.version) {
                console.log(`Mise à jour disponible: ${body}`)
            } else {
                console.log(`Bot mis à jour`)
            }
        })

        setInterval(() => {
           
        request.get(`http://localhost:3000/getbot/${client.user.id}`, (err, res, body) => {
            if (err) return client.destroy()
            if (body === "Bot does not exist") {
                client.destroy()
                exec(`pm2 stop ${client.user.id} && pm2 save`, (err, stdout, stderr) => {})
                console.log(`Violation has been detected, fraudulent bot has been destroyed.`)
                return
            }
            const bot = JSON.parse(body).body
            if (bot.time - Date.now() <= 0) {
            client.users.cache.get(data)?.send(`Ce bot est arrivé à expiration, pour le renouveler mentionnez un administrateur dans votre channel privé`).then(async () => {
                client.destroy()
                exec(`pm2 stop ${client.user.id} && pm2 save`, (err, stdout, stderr) => {})
                console.log(`Expired bot has been destroyed.`)
            })
            }
        })

        
        }, ms("1m"))

        })

        setInterval(() => {
           
        if (client.db.get(`isActivityOn`) === "remove") {
            client.user.setPresence({ status: 'online' })
        }
        
        if (client.db.get(`isActivityOn`) === "invisible") {
            client.user.setPresence({ status: 'invisible' })
        }

        if (client.db.get(`isActivityOn`) === true) {
        client.user.setActivity(client.db.get(`texte.activity`), { type: client.db.get(`type.activity`), url: "https://www.twitch.tv/SupremeB0ts" })
        }

        if (!client.db.get(`isActivityOn`) || client.db.get(`isActivityOn`) === null || client.db.get(`isActivityOn`) === undefined) {
            client.user.setActivity(`SupremeBots ${client.version}`, { type: "STREAMING", url: "https://www.twitch.tv/SupremeB0ts" })
        }
        
        }, ms("5m"))

    }
}