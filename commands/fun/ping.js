const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		console.log("id: ", interaction.member.roles.cache.some(role => role.name === '어드민'));
		// console.log("id: ", interaction.member.roles.cache);
		return interaction.reply('Pong!');
	},
};
