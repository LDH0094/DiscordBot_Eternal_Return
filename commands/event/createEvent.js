const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { eventAdminId } = require('../../config.json');
const { unauthorizedEmbed } = require('../../embeds/unauthorized_embed');
const EventModel = require('../../schemas/event.schema');
const { createEventEmbed } = require('../../embeds/event_embed');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('내전개시')
        .setDescription('내전이 몇일 뒤에 행해질지를 정합니다.')
        .addStringOption(option => option
            .setName('내전이름')
            .setDescription('내전이름을 정해주세요.')
            .setRequired(true))
        .addNumberOption(option =>
            option
                .setName('몇일뒤')
                .setDescription('몇일 뒤에 시작할지 정해주세요.')
                .setRequired(true))
    ,
    async execute(interaction) {
        const postDays = interaction.options.getNumber('몇일뒤');
        const eventName = interaction.options.getString('내전이름') ?? "No event name";
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + postDays);
        currentDate.setHours(21, 30, 0, 0);
        const newEvent = new EventModel({
            eventName: eventName,
            startDate: currentDate
        });
        if (!interaction.member.roles.cache.has(eventAdminId)) return interaction.reply({ embeds: [unauthorizedEmbed] });
        
        newEvent.save()
        .then(() => {
            const eventEmbed = createEventEmbed(eventName, currentDate );
            return interaction.reply({embeds: [eventEmbed]})
          })
          .catch((error) => {
            console.error('Error saving document:', error);
          });
    },
};
