const UserModel = require('../schemas/user.schema');
async function createEventParticipantsEmbed(eventName, date, participants) {
    const embeds = [];

    try {
        // Fetch user details for participants using population
        const populatedParticipants = [];
        for (const participantId of participants) {
            // Fetch user information from UserModel
            try {
                const user = await UserModel.findById(participantId);
                if (user) {
                    populatedParticipants.push(user);
                }
            } catch (error) {
                console.error(`Error finding user with ID ${participantId}: ${error}`);
                // Handle the error as needed
            }
        }

        // Check if there are participants to display
        if (populatedParticipants.length === 0) {
            console.log('No participants found');
            return embeds;
        }

        // Generating formatted participant list with user information
        const participantList = populatedParticipants.map((user, index) => {
            // Modify this section to format the user information as needed
            const charactersWithSpaces = user.characters.join(' ');
            return `${index + 1}번 <@${user.userId}> ${user.erName} [${user.rank}] ${charactersWithSpaces}`;
        });

        // Splitting participantList into chunks to fit within Discord's character limit
        const chunkSize = 20; // Adjust this number based on the maximum characters allowed
        for (let i = 0; i < participantList.length; i += chunkSize) {
            const chunk = participantList.slice(i, i + chunkSize).join('\n');

            const eventEmbed = {
                color: 0x458DAA,
                title: eventName,
                // ... other embed properties

                fields: [
                    {
                        name: i === 0 ? '참가자들 명단' : `참가자들 명단 (${Math.floor(i / chunkSize) + 1})`,
                        value: chunk || "참가자들이 존재하지 않습니다.",
                    }
                ],
                timestamp: new Date().toISOString(),
            };

            embeds.push(eventEmbed);
        }
    } catch (err) {
        console.error('Error while fetching participants:', err);
        // You may handle the error here
    }

    return embeds;
}

module.exports = { createEventParticipantsEmbed };
