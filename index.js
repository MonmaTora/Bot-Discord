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
const prefix = "!";

client.on('ready', () => {
    client.application.commands.create(data);
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
    // Exit and stop if it's not there
    if (!message.content.startsWith(prefix)) return;
  
    // Command ping-pong
    if (message.content.startsWith(`${prefix}ping`)) {
        message.channel.send("pong!");
        interaction.channel.bulkDelete(1);
    } 
    else if (message.content.startsWith(`${prefix}mention`)) {
        message.reply("Mention d'un utilisateur : <@" + message.author.id + "> \n Mention d'un salon : <#" + message.channel.id + ">");
        interaction.channel.bulkDelete(1);
    }
    else if (message.content.startsWith(`${prefix}list-command`)) {
        message.reply("Les commandes du bot sont \n"
            + "/ping            | Réponds 'pong' \n"
            + "/list-command    | Liste des commandes du bot \n"
            + "/clear           | Efface jusqu'a 100 messages \n" 
            + "/mention         | mention");
        interaction.channel.bulkDelete(1);
    }
  });

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