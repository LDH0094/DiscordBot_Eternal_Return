const { eventRegisterChannelUrl } = require("../hooks/channel-hooks");

function createPOGEmbed(eventData) {
    const eventEmbed = {
        color: 0x0c2a6e,
        title: eventData.eventName,
        description: 'POG 리스트 입니다',
        thumbnail: {
            url: 'https://t1.kakaocdn.net/gamepub/gaia/image/common/fe925cec72d6f37a6c1f2c9757c9579b3eb9c91c',
        },
        fields: [
            {
                name: '자세한 정보',
                value: `<t:${eventData.startDate}> 에 시행된 내전입니다!`,
            },
            {
                name: eventData.isDone ? '\u200b' :'내전 설명',
                value: eventData.description,
                inline: false,
            },
            {
                name: '1게임 POG',
                value: `<@${eventData.pogList[0]}>`,
                inline: true,
            },
            {
                name: '2게임 POG',
                value: eventData.pogList[1] === "" ? '\u200b': `<@${eventData.pogList[1]}>` ,
                inline: true,
            },
            {
                name:  '3게임 POG',
                value: eventData.pogList[2] === "" ? '\u200b': `<@${eventData.pogList[2]}>`,
                inline: true,
            },
            {
                name: '4게임 POG',
                value: eventData.pogList[3] === "" ? '\u200b': `<@${eventData.pogList[3]}>`,
                inline: true,
            },
            {
                name: '내전 ID',
                value: `${eventData._id}`,
            },
            {
                name: '\u200b',
                value: eventData.isDone ? "종료됨" : "진행중",
            }
        ],
        timestamp: new Date().toISOString(),
    };

    return eventEmbed ;
}

module.exports = {createPOGEmbed};