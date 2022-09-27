// Run dotenv
require('dotenv').config();

const {Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", message => {
    if(message.author.bot) return;
    console.log(message.content);
    if(message.content === "ping"){
        message.reply("pong");
        message.channel.send("pong");
    }
    else if(message.content === "help"){
        message.reply("les commandes du bot sont \n ...");
    }
    else if(message.content === "mention"){
        message.reply("Mention d'un utilisateur : <@" + message.author.id + "> \n Mention d'un salon : <#" + message.channel.id + ">");
    }
})

client.login(process.env.DISCORD_TOKEN);