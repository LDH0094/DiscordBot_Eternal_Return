const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { eventAdminId } = require("../../config.json");
const { unauthorizedEmbed } = require("../../embeds/unauthorized_embed");
const EventModel = require("../../schemas/event.schema");
const { createEventEmbed, createWarningEmbed } = require("../../embeds/event_embed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("내전개시")
    .setDescription("내전이 몇일 뒤에 행해질지를 정합니다.")
    .addStringOption((option) =>
      option
        .setName("내전이름")
        .setDescription("내전이름을 정해주세요.")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("몇일뒤")
        .setDescription("몇일 뒤에 시작할지 정해주세요.")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("몇시")
        .setDescription("24시 기준")
        .setRequired(true)
    ).addNumberOption((option) =>
    option
      .setName("몇분")
      .setDescription("0~59분")
      .setRequired(true)
  ),
  async execute(interaction) {
    const postDays = interaction.options.getNumber("몇일뒤");
    const eventName =
      interaction.options.getString("내전이름") ?? "No event name";
    const currentDate = new Date();
    const getHours = interaction.options.getNumber("몇시");
    const getMins = interaction.options.getNumber("몇분");
    currentDate.setDate(currentDate.getDate() + postDays);
    currentDate.setHours(getHours, getMins, 0, 0);
    const newEvent = new EventModel({
      eventName: eventName,
      startDate: currentDate,
      date: new Date(),
    });
    if (!interaction.member.roles.cache.has(eventAdminId))
      return interaction.reply({ embeds: [unauthorizedEmbed] });

    const recentEvent = await EventModel.findOne(
      {},
      {},
      { sort: { createdAt: -1 } }
    );

    if (recentEvent && !recentEvent.isDone || !recentEvent.isCanceled) {
      const eventWarningEmbed = createWarningEmbed(
        recentEvent.eventName,
        recentEvent.startDate,
      );
      return await interaction.reply({ embeds: [eventWarningEmbed] });
    } else {
        newEvent
        .save()
        .then((result) => {
          const eventEmbed = createEventEmbed(eventName, currentDate, result);
          return interaction.reply({ embeds: [eventEmbed] });
        })
        .catch((error) => {
          console.error("Error saving document:", error);
        });
    }
    
  },
};
