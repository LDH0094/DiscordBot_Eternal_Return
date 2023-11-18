const { eventRegisterChannelUrl } = require("../hooks/channel-hooks");

function createUserEmbed(nickname, most, rank, url) {
    const formattedValues = most.join(', ')
    const eventEmbed = {
        color: 0x458DAA,
        title: '나의 정보',
        description: '등록하신 정보는 다음과 같습니다.',
        thumbnail: {
            url: url,
        },
        fields: [
            {
                name: '자세한 정보',
                value: `${nickname}의 내전 정보입니다!`,

            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },
            {
                name: '내전 전투력',
                value: '개발중인 기능입니다.',
                inline: true,
            },
            {
                name: '나의 최고 티어',
                value: rank,
                inline: true,
            },
            {
                name: '나의 모스트',
                value: formattedValues,
                inline: true,
            },
        ],
        timestamp: new Date().toISOString(),
    };

    return eventEmbed ;
}

module.exports = {createUserEmbed};