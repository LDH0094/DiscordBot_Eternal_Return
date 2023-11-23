const UserModel = require('../schemas/user.schema');

async function createEventParticipantsEmbed(eventName, date, participants) {
    const eventEmbed = {
        color: 0x458DAA,
        title: eventName,
        description: '다음 내전의 참가자들 목록입니다. (참가 취소 제외)',
        thumbnail: {
            url: 'https://t1.kakaocdn.net/gamepub/gaia/image/common/fe925cec72d6f37a6c1f2c9757c9579b3eb9c91c',
        },
        fields: [
            {
                name: '자세한 정보',
                value: `<t:${date}> 에 시행될 예정입니다. \n 늦지 않도록 유의해 주세요!`,
            },
            {
                name: '참가자들 명단',
                value: ' ',
            }
        ],
        timestamp: new Date().toISOString(),
    };

    try {
        // Fetch user details for participants using population
        const populatedParticipants = []
        for (const participantId of participants) {
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
        console.log("users: ", populatedParticipants.length);
        if (populatedParticipants.length === 0){
            console.log('return!!');
            return eventEmbed;
        }
        // Generating formatted participant list witsh user information
        const participantList = populatedParticipants.map((user, index) => {
            const charatersWithSpaces = user.characters.join(' ');
            return `${index + 1}번 <@${user.userId}> ${user.erName} [${user.rank}] ${charatersWithSpaces}`; // Modify as per your UserModel structure
        });

        eventEmbed.fields[1].value = participantList.join('\n') || "참가자들이 존재하지 않습니다.";
    } catch (err) {
        console.error('Error while fetching participants:', err);
        eventEmbed.fields[1].value = '참가자 정보를 가져오는 중 오류가 발생했습니다.';
    }

    return eventEmbed;
}

module.exports = {createEventParticipantsEmbed};