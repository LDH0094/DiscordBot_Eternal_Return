const { SlashCommandBuilder } = require("discord.js");
const EventModel = require("../../schemas/event.schema");
const UserModel = require("../../schemas/user.schema");
const {
  createEventEmbed,
  createWarningEmbed,
} = require("../../embeds/event_embed");
const { unauthorizedEmbed } = require("../../embeds/unauthorized_embed");
require('dotenv').config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

module.exports = {
  data: new SlashCommandBuilder()
    .setName("내전수정")
    .setDescription("개최될 내정 정보를 수정합니다!")
    .addStringOption((option) =>
      option
        .setName("내전아이디")
        .setDescription("대상 내전 ID를 입력합니다.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("내전이름").setDescription("내전이름을 수정합니다.")
    )
    .addStringOption((option) =>
      option.setName("내전설명").setDescription("내전설명을 수정합니다.")
    )
    .addBooleanOption((option) =>
    option.setName("종료").setDescription("종료가 되었나요?")
  )
    .addNumberOption((option) =>
      option.setName("몇일뒤").setDescription("몇일 뒤에 시작할지 수정합니다.")
    )
    .addNumberOption((option) =>
      option.setName("몇시").setDescription("24시 기준")
    )
    .addNumberOption((option) =>
      option.setName("몇분").setDescription("0~59분")
    ),
  async execute(interaction) {
    const eventID = interaction.options.getString("내전아이디");
    const myId = interaction.user.id;
    const postDays = interaction.options.getNumber("몇일뒤");
    const eventName =
      interaction.options.getString("내전이름") ?? "";
      const eventDescription = interaction.options.getString("내전설명") ?? "";
    const currentDate = new Date();
    const _isDone = interaction.options.getBoolean("종료");
    const hours = interaction.options.getNumber("몇시");
    const mins = interaction.options.getNumber("몇분");
    currentDate.setDate(currentDate.getDate() + postDays);
    currentDate.setHours(hours, mins, 0, 0);
    const timestampInSeconds = Math.floor(currentDate.getTime() / 1000);
    const koreanTimestamp = timestampInSeconds ;
    console.log("my date: ", currentDate);

    if (!interaction.member.roles.cache.has(process.env.EVENT_ADMIN_ID))
      return interaction.reply({ embeds: [unauthorizedEmbed] });
    try {
      // Find the most recent event based on the 'createdAt' field
      const recentEvent = await EventModel.findOne(
        {},
        {},
        { sort: { createdAt: -1 } }
      );

      if (recentEvent && !recentEvent.isDone ) {
        console.log("recent: ", recentEvent);
        // Add the user's ID to the 'participants' array in the recent event
        const updatedEvent = await EventModel.findOneAndUpdate(
          { _id: eventID }, // Query by the event ID
          {
            eventName: eventName === "" ? recentEvent.eventName: eventName,
            startDate: koreanTimestamp ?? recentEvent.currentDate,
            description: eventDescription === "" ? recentEvent.eventName: eventDescription,
            isDone: _isDone ?? recentEvent.isDone,
          },
          { new: true } // To return the updated document
        );
     
        if (updatedEvent) {
          const eventEmbed = createEventEmbed(
            updatedEvent
          );
          return await interaction.reply({ embeds: [eventEmbed] });
        }
      } else {
        return interaction.reply("진행중인 내전이 존재하지 않습니다.");
      }
    } catch (err) {
      console.error("Error:", err);
      await interaction.reply(
        "An error occurred while processing the command."
      );
    }
  },
};
