const { SlashCommandBuilder } = require("@discordjs/builders");
let crypto_price = require("crypto-price");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cryptoprice")
    .setDescription(
      "Replies with the price of a cryptocurrency provided in command."
    )
    .addStringOption((option) =>
      option
        .setName("crypto")
        .setDescription("The input to echo back")
        .setRequired(true)
    ),
  async execute(interaction) {
    const crypto = interaction.options.getString("crypto");
    const base = "USD";

    console.log("crypto: ", crypto);

    var price;

    await crypto_price
      .getBasePrice(base, crypto)
      .then((obj) => {
        // Base for ex - USD, Crypto for ex - ETH
        console.log(obj.price);
        price = obj.price;
        return interaction.reply(`The price of ${crypto} is ${price}`);
      })
      .catch((err) => {
        console.log(err);
        interaction.reply(err);
        return err;
      });
  },
};
