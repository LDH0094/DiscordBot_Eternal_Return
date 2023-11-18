const { SlashCommandBuilder } = require("discord.js");
const EventModel = require("../../schemas/event.schema");
const UserModel = require('../../schemas/user.schema');
const { createEventJoinEmbed } = require("../../embeds/eventJoin_embed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("내전참가")
    .setDescription(
      "실행되고 있는 내전을 참가합니다! 내전정보를 등록하지 않으셨다면 등록해주세요!"
    ),
  async execute(interaction) {
    const myId = interaction.user.id;
    try {
      const foundUser = await UserModel.findOne({ userId: myId });

      if (foundUser) {
        // Find the most recent event based on the 'createdAt' field
        const recentEvent = await EventModel.findOne({}, {}, { sort: { createdAt: -1 } });

        if (recentEvent && !recentEvent.isDone && !recentEvent.isCanceled) {
          // Add the user's ID to the 'participants' array in the recent event
          recentEvent.participants.addToSet(myId);
          await recentEvent.save(); // Save the updated event document

          const joinEmbed = createEventJoinEmbed(
            recentEvent.eventName,
            recentEvent.startDate,
            recentEvent
          );
          return await interaction.reply({ embeds: [joinEmbed] });
        } else {
          console.log("Event not found");
          return interaction.reply("Could not find the event.");
        }
      } else {
        console.log("User not found");
        return interaction.reply(
          "내전 정보가 없어요...\n/내전정보 를 이용해 정보를 먼저 입력해주세요!"
        );
      }
    } catch (err) {
      console.error("Error:", err);
      await interaction.reply(
        "An error occurred while processing the command."
      );
    }
  },
};
