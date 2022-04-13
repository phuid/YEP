const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with \"Pong!\"'),
	async execute(interaction) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('ping')
					.setLabel('"Ping!"')
					.setStyle('PRIMARY'),
			);

		return interaction.reply({ content: `Pong!!! -ping 2022 `, components: [row] });
	},
};