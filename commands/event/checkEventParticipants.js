const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
require('dotenv').config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });
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
    if (!interaction.member.roles.cache.has(process.env.EVENT_ADMIN_ID))
      return interaction.reply({ embeds: [unauthorizedEmbed] });
    const recentEvent = await EventModel.findOne(
      {},
      {},
      { sort: { createdAt: -1 } }
    );

    if (recentEvent && !recentEvent.isDone && !recentEvent.isCanceled) {

      const eventParticipantsEmbed = await createEventParticipantsEmbed(
        recentEvent.eventName,
        recentEvent.startDate,
        recentEvent.participants
      );
      return await interaction.reply({ embeds: [eventParticipantsEmbed] });
    }
  },
};
