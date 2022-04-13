const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite_bot')
		.setDescription('Replies with a link to invite this bot to your server.'),
	async execute(interaction, client) {
		return interaction.reply(`https://discord.com/api/oauth2/authorize?client_id=699593157234524180&permissions=8&scope=bot%20applications.commands`);
	},
};