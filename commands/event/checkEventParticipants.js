const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { eventAdminId } = require("../../config.json");
const { unauthorizedEmbed } = require("../../embeds/unauthorized_embed");
const EventModel = require("../../schemas/event.schema");
const { createEventEmbed } = require("../../embeds/event_embed");
const {
  createEventParticipantsEmbed,
} = require("../../embeds/eventParticipants_embed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("내전참가자들")
    .setDescription("가장 최근에 개최한 내전 참가자들 현황을 확인합니다."),
  async execute(interaction) {
    if (!interaction.member.roles.cache.has(eventAdminId))
      return interaction.reply({ embeds: [unauthorizedEmbed] });
    const recentEvent = await EventModel.findOne(
      {},
      {},
      { sort: { createdAt: -1 } }
    );

    if (recentEvent && !recentEvent.isDone && !recentEvent.isCanceled) {

      const eventParticipantsEmbed = createEventParticipantsEmbed(
        recentEvent.eventName,
        recentEvent.startDate,
        recentEvent.participants
      );
      return await interaction.reply({ embeds: [eventParticipantsEmbed] });
    }
  },
};
