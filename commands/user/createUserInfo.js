const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { eventAdminId } = require('../../config.json');
const { unauthorizedEmbed } = require('../../embeds/unauthorized_embed');
const EventModel = require('../../schemas/event.schema');
const { createEventEmbed } = require('../../embeds/event_embed');
const UserModel = require('../../schemas/user.schema');
const { createUserEmbed } = require('../../embeds/userInfo_embed');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('내전정보')
        .setDescription('나의 내전 정보를 입력합니다.')
        .addStringOption(option => option
            .setName('닉네임')
            .setDescription('이터널 리턴 닉네임을 적어주세요.')
            .setRequired(true))
        .addStringOption(option =>
                option
                    .setName('티어')
                    .setDescription('자신의 현시즌과 전시즌중 가장 높은 티어를 선택.')
                    .setRequired(true)
                    .addChoices(
                        { name: '아이언', value: '아이언' },
                        { name: '브론즈', value: '브론즈' },
                        { name: '실버', value: '실버' },
                        { name: '골드', value: '골드' },
                        { name: '플레티넘', value: '플레티넘' },
                        { name: '다이아', value: '다이아' },
                        { name: '미스릴', value: '미스릴' },
                        { name: '데미갓', value: '데미갓' },
                        { name: '이터니티', value: '이터니티' },
                    ))
        .addStringOption(option =>
            option
                .setName('모스트')
                .setDescription('모스트 실험체를 적어주세요. (예., 아이작 비앙카 아이솔)')
                .setRequired(true))
    ,
    async execute(interaction) {
        const erNickname = interaction.options.getString('닉네임') ?? "No nickname defined.";
        const erMost = interaction.options.getString('모스트') ?? "";
        const _rank = interaction.options.getString('티어');
        const userId = interaction.user.id;
        const erMosts = erMost.split(" ");

        if (erMost.includes(",")) return interaction.reply('정확한 뛰어쓰기로 모스트 실험체를 적어주세요!');

        const newUser = new UserModel({
            userId: userId,
            erName: erNickname,
            characters: erMosts,
            rank: _rank
        });

        newUser.save()
        .then(() => {
            const userEmbed = createUserEmbed(erNickname, erMosts, _rank);
            return interaction.reply({embeds: [userEmbed]})
          })
          .catch((error) => {
            console.error('Error saving document:', error);
          });
    },
};
