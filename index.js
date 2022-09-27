// Run dotenv
require('dotenv').config();

const {Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready', () => {
    client.application.commands.create(data);
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

// Command Clear
var data = new SlashCommandBuilder()
    .setName("clear")
    .setDescription("commande pour supprimer des messages")
    .addIntegerOption(option =>
        option.setName("number")
            .setDescription("Nombre de messages que vous voulez suprimer")
            .setRequired(true)
        );

client.on("interactionCreate", interaction => {
    if(interaction.isCommand()){
        if(interaction.commandName === "clear"){
            var number = interaction.options.getInteger("number");

            if(number >= 1 && number <= 100){
                interaction.channel.bulkDelete(number);
                interaction.reply({content: number + " messages correctement supprimés", ephemeral: true})
            }
            else {
                interaction.reply({content: "Le nombre de messages supprimés doit être situé entre 1 et 100.", ephemeral: true})
            }
        }
    }
})
client.login(process.env.DISCORD_TOKEN);