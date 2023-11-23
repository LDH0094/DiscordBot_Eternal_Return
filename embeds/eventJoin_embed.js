const { eventRegisterChannelUrl } = require("../hooks/channel-hooks");

function createEventJoinEmbed(eventName, date, eventData) {
    const eventEmbed = {
        color: 0x458DAA,
        title: eventName,
        description: '내전에 참가 등록하였습니다. ',
        thumbnail: {
            url: 'https://t1.kakaocdn.net/gamepub/gaia/image/common/fe925cec72d6f37a6c1f2c9757c9579b3eb9c91c',
        },
        fields: [
            {
                name: '자세한 정보',
                value: `<t:${eventData.startDate}> 에 시행될 예정입니다. \n 늦지 않도록 유의해 주세요!`,
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

function createEventRejectEmbed(eventData) {
    const eventEmbed = {
        color: 0xff0000,
        title: eventData.eventName,
        description: '내전에 참가를 취소하였습니다. ',
        thumbnail: {
            url: 'https://t1.kakaocdn.net/gamepub/gaia/image/common/fe925cec72d6f37a6c1f2c9757c9579b3eb9c91c',
        },
        fields: [
            {
                name: '자세한 정보',
                value: `<t:${eventData.startDate}> 에 시행될 예정이였던 내전을 취소했습니다.`,
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
module.exports = {createEventJoinEmbed, createEventRejectEmbed};