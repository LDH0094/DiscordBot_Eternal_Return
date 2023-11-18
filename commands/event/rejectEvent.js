const { SlashCommandBuilder } = require("discord.js");
const EventModel = require("../../schemas/event.schema");
const UserModel = require('../../schemas/user.schema');
const { createEventJoinEmbed, createEventRejectEmbed } = require("../../embeds/eventJoin_embed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("내전거절")
    .setDescription(
      "실행되고 있는 내전 참가를 포기합니다. 반복된 수락 혹은 거절은 제재대상이 될 수 있습니다."
    ),
  async execute(interaction) {
    const myId = interaction.user.id;
    try {
      const foundUser = await UserModel.findOne({ userId: myId });

      if (foundUser) {
        // Find the most recent event based on the 'createdAt' field
        const recentEvent = await EventModel.findOne({}, {}, { sort: { createdAt: -1 } });

        if (recentEvent && !recentEvent.isDone && !recentEvent.isCanceled) {
          // Remove the user's ID from the 'participants' array in the recent event
          await EventModel.updateOne(
            { _id: recentEvent._id }, // Query by event ID
            { $pull: { participants: myId } } // Remove the ID from the participants array
          );

          const rejectEmbed = createEventRejectEmbed(
            recentEvent
          );
          return await interaction.reply({ embeds: [rejectEmbed] });
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
