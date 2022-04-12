const { SlashCommandBuilder } = require("@discordjs/builders");
const price = require("crypto-price");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cryptoprice")
    .setDescription("Replies with the price of a cryptocurrency provided in command.")
    .addStringOption((option) =>
      option
        .setName("crypto")
        .setDescription("The input to echo back")
        .setRequired(true)
    ),
  async execute(interaction) {
    return () => {
      const crypto = interaction.options.getString("crypto");
      price
        .getBasePrice(base, crypto)
        .then((obj) => {
          // Base for ex - USD, Crypto for ex - ETH
          console.log(obj.price);
          interaction.reply(`${interaction.options.getString("input")} is currently worth ${obj.price} USD`);
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    };
  },
};
