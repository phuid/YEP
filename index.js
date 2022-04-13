const fs = require("node:fs");
const { Client, Collection, Intents } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES] }); //https://discord.js.org/#/docs/main/stable/class/Intents?scrollTo=s-FLAGS https://discord.com/developers/docs/topics/gateway#list-of-intents

client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.buttonhandlers = new Collection();
const buttonhandlerFiles = fs
  .readdirSync("./buttons")
  .filter((file) => file.endsWith(".js"));

for (const file of buttonhandlerFiles) {
  const buttonhandler = require(`./buttons/${file}`);
  client.buttonhandlers.set(buttonhandler.data.custom_id, buttonhandler);
}

client.once("ready", () => {
  console.log("Ready!, https://discord.com/api/oauth2/authorize?client_id=699593157234524180&permissions=8&scope=bot%20applications.commands");

  client.channels
        .fetch(`963494197820817488`)
        .then((channel) => {
          channel.send("Ready!");
        });
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      console.log(interaction);
      await command.execute(interaction, client);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  } else if (interaction.isButton()) {
    const buttonhandler = client.buttonhandlers.get(interaction.buttonName);

    if (!buttonhandler) return;

    try {
      console.log(interaction);
      await buttonhandler.execute(interaction, client);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this interaction!",
        ephemeral: true,
      });
    }
  }
});

client.login(token);
