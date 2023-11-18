const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { eventAdminId } = require('../../config.json');
const { unauthorizedEmbed } = require('../../embeds/unauthorized_embed');
const EventModel = require('../../schemas/event.schema');
const { createEventEmbed } = require('../../embeds/event_embed');
const UserModel = require('../../schemas/user.schema');
const { createUserEmbed } = require('../../embeds/userInfo_embed');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('내정보확인')
        .setDescription('나의 내전 정보를 확인합니다.')
    ,
    async execute(interaction) {
        const myId = interaction.user.id;
        try {
            // Assuming UserModel is your Mongoose model
            const foundUser = await UserModel.findOne({ userId: myId });
            if (foundUser) {
              console.log('Found user:', foundUser);
              const userEmbed = createUserEmbed(foundUser.erName, foundUser.characters, foundUser.rank, foundUser.profileUrl);
              await interaction.reply({ embeds: [userEmbed] });
            } else {
              console.log('User not found');
              await interaction.reply("내전 정보없음\n /내전정보 를 이용해 정보를 먼저 입력해주세요!");
            }
          } catch (err) {
            console.error('Error finding user:', err);
            // Handle the error accordingly, like replying with an error message
            await interaction.reply('An error occurred while fetching user information.');
          }
    },
};
