const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const request = require('request');
const fs = require('fs');

module.exports = {
    name: "buyer",
    aliases: [],
    description: "Permet de lister, d'ajouter ou de supprimer des buyers",
    category: "proprio",
    usage: ["buyer add <utilisateur>", "buyer remove <utilisateur>"],

    /**
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {Array<>} args 
     * @param {string} commandName 
     */

    run: async (client, message, args, color, prefix, footer, commandName) => {

        // A REFAIRE

    }}
