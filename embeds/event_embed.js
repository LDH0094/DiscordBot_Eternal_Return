const { eventRegisterChannelUrl } = require("../hooks/channel-hooks");

function createEventEmbed(eventName, date, eventData) {
    const eventEmbed = {
        color: 0x458DAA,
        title: eventName,
        description: '내전이 개최되었습니다. ',
        thumbnail: {
            url: 'https://t1.kakaocdn.net/gamepub/gaia/image/common/fe925cec72d6f37a6c1f2c9757c9579b3eb9c91c',
        },
        fields: [
            {
                name: '자세한 정보',
                value: `<t:${Math.floor(date.getTime() / 1000)}> 에 시행될 예정입니다. \n [여기를 클릭해 신청하세요.](${eventRegisterChannelUrl})`,
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

function createWarningEmbed(eventName, date) {
    const eventEmbed = {
        color: 0xff0000,
        title: eventName,
        description: '다음 내전이 이미 진행중입니다.\n새로운 내전을 만들기 위해서는 기존 개전은 종료 혹은 취소 해주세요.',
        thumbnail: {
            url: 'https://t1.kakaocdn.net/gamepub/gaia/image/common/fe925cec72d6f37a6c1f2c9757c9579b3eb9c91c',
        },
        fields: [
            {
                name: '자세한 정보',
                value: `<t:${Math.floor(date.getTime() / 1000)}> 에 시행될 예정입니다.`,
            }
        ],
        timestamp: new Date().toISOString(),
    };

    return eventEmbed ;
}

module.exports = {createEventEmbed, createWarningEmbed};