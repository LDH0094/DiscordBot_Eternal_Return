const { eventRegisterChannelUrl } = require("../hooks/channel-hooks");

function createUserEmbed(user) {
    const formattedValues = user.characters.join(', ')
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
                name: '내전 참가 기록',
                value: '* 제 1차 공식내전 1세트 POG (20102304).',
                inline: false,
            },
            {
                name: '내전 전적 POG',
                value: '* 제 1차 공식내전 1세트 POG (20102304).',
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