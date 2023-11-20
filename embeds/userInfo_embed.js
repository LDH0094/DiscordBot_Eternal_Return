const { eventRegisterChannelUrl } = require("../hooks/channel-hooks");

function createUserEmbed(user, events) {
    const formattedValues = user.characters.join(', ')
    const eventNames = events.map(event => `* ${event.eventName}        내전ID: (${event._id}).`).join('\n');
    const eventEmbed = {
        color: 0x458DAA,
        title: '나의 정보',
        description: '등록하신 정보는 다음과 같습니다.',
        thumbnail: {
            url: user.profileUrl,
        },
        fields: [
            {
                name: '자세한 정보',
                value: `${user.erName}의 내전 정보입니다!\n${user.profileDescription}`,

            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },
            {
                name: '나의 내전 캐리력',
                value: '개발중인 기능입니다.',
                inline: true,
            },
            {
                name: '나의 최고 티어',
                value: user.rank,
                inline: true,
            },
            {
                name: '나의 모스트',
                value: formattedValues,
                inline: true,
            },
            {
                name: '내전 전적 POG',
                value: eventNames || '내전 정보 없음',
                inline: false,
            },
        ],
        image: {
            url: user.profileUrl,
        },
        timestamp: new Date().toISOString(),
    };

    return eventEmbed ;
}

module.exports = {createUserEmbed};