const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
require('dotenv').config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });
const { unauthorizedEmbed } = require("../../embeds/unauthorized_embed");
const EventModel = require("../../schemas/event.schema");
const { createEventEmbed } = require("../../embeds/event_embed");
const UserModel = require("../../schemas/user.schema");
const { createUserEmbed } = require("../../embeds/userInfo_embed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("나의내전정보")
    .setDescription("나의 내전 정보를 입력하거나 수정합니다.")
    .addStringOption((option) =>
      option
        .setName("닉네임")
        .setDescription("이터널 리턴 닉네임을 적어주세요.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("티어")
        .setDescription("자신의 현시즌과 전시즌중 가장 높은 티어를 선택.")
        .setRequired(true)
        .addChoices(
          { name: "아이언", value: "아이언" },
          { name: "브론즈", value: "브론즈" },
          { name: "실버", value: "실버" },
          { name: "골드", value: "골드" },
          { name: "플레티넘", value: "플레티넘" },
          { name: "다이아", value: "다이아" },
          { name: "미스릴", value: "미스릴" },
          { name: "데미갓", value: "데미갓" },
          { name: "이터니티", value: "이터니티" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("모스트")
        .setDescription(
          "모스트 실험체를 2개 이상 적어주세요. (예., 아이작 비앙카 아이솔)"
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
    option
      .setName("내소개")
      .setDescription("나의 소개를 적어주세요")
  )
    .addStringOption((option) =>
      option
        .setName("url")
        .setDescription(
          "설정하고 싶은 프로필 이미지 url를 등록할 수 있습니다!"
        )
    )
    ,
  async execute(interaction) {
    const erNickname =
      interaction.options.getString("닉네임") ?? "No nickname defined.";
    const erMost = interaction.options.getString("모스트") ?? "";
    const profileDescription = interaction.options.getString("내소개") ?? "";
    const _rank = interaction.options.getString("티어");
    const userId = interaction.user.id;
    const profileUrl = interaction.options.getString("url") ?? "https://t1.kakaocdn.net/gamepub/gaia/image/common/10ffb001f0382b413ead4be8f56a939a034dfc77"
    const erMosts = erMost.split(" ");

    if (!erMost.includes(" "))
      return interaction.reply("정확한 뛰어쓰기로 모스트 실험체를 적어주세요!");

    const newUser = {
      userId: userId,
      erName: erNickname,
      characters: erMosts,
      rank: _rank,
      profileUrl: profileUrl,
      profileDescription: profileDescription
    };

    try {
      // Find the user by userId
      const query = { userId: userId };
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };

      const updatedUser = await UserModel.findOneAndUpdate(
        query,
        newUser,
        options
      );

      if (updatedUser) {
        const userEmbed = createUserEmbed(
            updatedUser
        );
        return interaction.reply({ embeds: [userEmbed] });
      }
    } catch (err) {
      console.error("Error updating/inserting user:", err);
      // Handle the error accordingly
    }
  },
};
