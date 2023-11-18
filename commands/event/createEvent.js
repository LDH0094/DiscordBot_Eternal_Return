const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const {eventAdminId} = require('../../config.json');
const { unauthorizedEmbed } = require('../../embeds/unauthorized_embed');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('내전개시')
		.setDescription('내전이 몇일 뒤에 행해질지를 정합니다.')
        .addNumberOption(option => option.setName('몇일뒤').setDescription('몇일 뒤에 시작할지 정해주세요.')),
	async execute(interaction) {
        const postDays = interaction.options.getNumber('몇일뒤');
        console.log("postDays", postDays);
		if (!interaction.member.roles.cache.has(eventAdminId)) return interaction.reply({embeds: [unauthorizedEmbed]});
		// console.log("id: ", interaction.member.roles.cache);
		return interaction.reply({embeds: [unauthorizedEmbed]});
	},
};
