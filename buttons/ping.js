const { MessageButton } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  data: new MessageButton()
    .setCustomId("ping")
    .setLabel('"Ping!"')
    .setStyle("PRIMARY"),
  async execute(interaction, client) {
    for (var i = 0; i < 3; i++) {
      await client.channels
        .fetch(`${interaction.channelId}`)
        .then((channel) => {
          channel.send("Hello @here!");
        });
        // await wait(1000);
    }
    return await interaction.reply(
      `Pong!!!, f u <@${interaction.user.id}> in channel ${interaction.channelId}`
    );
  },
};
