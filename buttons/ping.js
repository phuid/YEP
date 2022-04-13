const { MessageButton } = require("discord.js");

module.exports = {
  data: new MessageButton()
    .setCustomId("ping")
    .setLabel('"Ping!"')
    .setStyle("PRIMARY"),
  async execute(interaction) {
    return interaction.reply(`Pong!!!, yeah f u <@${interaction.user.id}>`);
  },
};
