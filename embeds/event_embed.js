const { eventRegisterChannelUrl } = require("../hooks/channel-hooks");

function createEventEmbed(eventData) {
    const eventEmbed = {
        color: eventData.isDone ? 0x0c2a6e: 0x458DAA,
        title: eventData.eventName,
        description: eventData.isDone ? '내전이 종료되었습니다!' : '내전이 개최되었습니다.',
        thumbnail: {
            url: 'https://t1.kakaocdn.net/gamepub/gaia/image/common/fe925cec72d6f37a6c1f2c9757c9579b3eb9c91c',
        },
        fields: [
            {
                name: '자세한 정보',
                value: eventData.isDone ? '종료된 내전입니다.' :`<t:${Math.floor(eventData.startDate.getTime() / 1000)}> 에 시행될 예정입니다. \n [여기를 클릭해 신청하세요.](${eventRegisterChannelUrl})`,
            },
            {
                name: eventData.isDone ? '\u200b' :'내전 설명',
                value: eventData.description,
                inline: false,
            },
            {
                name: '1게임 POG',
                value: eventData.isDone ? `<@${eventData.pogList[0]}>`: '\u200b',
                inline: true,
            },
            {
                name: '2게임 POG',
                value: eventData.isDone ? `<@${eventData.pogList[1]}>`: '\u200b' ,
                inline: true,
            },
            {
                name:  '3게임 POG',
                value: eventData.isDone ? `<@${eventData.pogList[2]}>`:'\u200b',
                inline: true,
            },
            {
                name: '4게임 POG',
                value: eventData.isDone ? `<@${eventData.pogList[3]}>`: '\u200b',
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

function createWarningEmbed(eventData) {
    const eventEmbed = {
        color: 0xff0000,
        title: eventData.eventName,
        description: '다음 내전이 이미 진행중입니다.\n새로운 내전을 만들기 위해서는 기존 개전은 종료 혹은 취소 해주세요.',
        thumbnail: {
            url: 'https://t1.kakaocdn.net/gamepub/gaia/image/common/fe925cec72d6f37a6c1f2c9757c9579b3eb9c91c',
        },
        fields: [
            {
                name: '자세한 정보',
                value: `<t:${Math.floor(eventData.startDate.getTime() / 1000)}> 에 시행될 예정입니다.`,
            },
            {
                name: '내전 ID',
                value: `${eventData._id}`,
            }
        ],
        timestamp: new Date().toISOString(),
    };

    return eventEmbed ;
}

module.exports = {createEventEmbed, createWarningEmbed};