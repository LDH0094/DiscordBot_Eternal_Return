const { SlashCommandBuilder } = require("discord.js");
const EventModel = require("../../schemas/event.schema");
const UserModel = require("../../schemas/user.schema");
const {
  createPOGEmbed,
} = require("../../embeds/pog_embed");
const { unauthorizedEmbed } = require("../../embeds/unauthorized_embed");
const { eventAdminId } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("내전팟지")
    .setDescription("(내전 관리자) POG를 추가합니다")
    .addStringOption((option) =>
      option
        .setName("내전아이디")
        .setDescription("대상 내전 ID를 입력합니다.")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("1게임팟지")
        .setDescription("1게임의 POG 등록 혹은 업데이트")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("2게임팟지")
        .setDescription("2게임의 POG 등록 혹은 업데이트")
    )
    .addUserOption((option) =>
      option
        .setName("3게임팟지")
        .setDescription("3게임의 POG 등록 혹은 업데이트")
    )
    .addUserOption((option) =>
      option
        .setName("4게임팟지")
        .setDescription("4게임의 POG 등록 혹은 업데이트")
    ),
  async execute(interaction) {
    const eventID = interaction.options.getString("내전아이디");
    const myId = interaction.user.id;

    const firstPOG = interaction.options.getUser("1게임팟지").id;
    const secondPOG = interaction.options.getUser("2게임팟지")?.id ?? "";
    const thirdPOG = interaction.options.getUser("3게임팟지")?.id ?? "";
    const fourthPOG = interaction.options.getUser("4게임팟지")?.id ?? "";
    
    let pogList = [];
    pogList[0] = firstPOG;
    pogList[1] = secondPOG;
    pogList[2] = thirdPOG;
    pogList[3] = fourthPOG;

    console.log("poglist: ", pogList);
    if (!interaction.member.roles.cache.has(eventAdminId))
      return interaction.reply({ embeds: [unauthorizedEmbed] });
    try {
      // Find the most recent event based on the 'createdAt' field
      const recentEvent = await EventModel.findOne(
        {},
        {},
        { sort: { createdAt: -1 } }
      );

      if (recentEvent && !recentEvent.isDone) {
        console.log("recent: ", recentEvent);
        // Add the user's ID to the 'participants' array in the recent event
        try {
          const updatedEvent = await EventModel.findOneAndUpdate(
            { _id: eventID }, // Query by the event ID
            { $set: { pogList: pogList } }, // Update the pogList field
            { new: true } // To return the updated document
          );

          if (updatedEvent) {
            const pogEmbed = createPOGEmbed(updatedEvent);
            return await interaction.reply({ embeds: [pogEmbed] });
          } else {
            return interaction.reply("Event with specified ID not found.");
          }
        } catch (err) {
          console.error("Error:", err);
          await interaction.reply(
            "An error occurred while processing the command."
          );
        }
      }
    } catch (err) {
      console.error("Error:", err);
      await interaction.reply(
        "An error occurred while processing the command."
      );
    }
  },
};
