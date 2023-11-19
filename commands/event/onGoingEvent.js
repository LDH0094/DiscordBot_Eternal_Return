const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { eventAdminId } = require("../../config.json");
const { unauthorizedEmbed } = require("../../embeds/unauthorized_embed");
const EventModel = require("../../schemas/event.schema");
const {
  createEventEmbed,
  createWarningEmbed,
} = require("../../embeds/event_embed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("진행중인내전")
    .setDescription("진행중인 내전을 확인합니다."),
  async execute(interaction) {
    const recentEvent = await EventModel.findOne(
      {},
      {},
      { sort: { createdAt: -1 } }
    );
    console.log("recent: ", recentEvent);
    if (recentEvent && !recentEvent.isDone) {
        const eventEmbed = createEventEmbed(recentEvent);
        return await interaction.reply({ embeds: [eventEmbed] });
    } else {
      return interaction.reply("진행중인 내전이 존재하지 않습니다!")
    }
  },
};
