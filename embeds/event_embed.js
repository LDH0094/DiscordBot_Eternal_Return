const { eventRegisterChannelUrl } = require("../hooks/channel-hooks");

function createEventEmbed(eventName, date) {
    const eventEmbed = {
        color: 0xff0000,
        title: eventName,
        description: '내전이 개최되었습니다. ',
        thumbnail: {
            url: 'https://t1.kakaocdn.net/gamepub/gaia/image/common/fe925cec72d6f37a6c1f2c9757c9579b3eb9c91c',
        },
        fields: [
            {
                name: '자세한 정보',
                value: `<t:${Math.floor(date.getTime() / 1000)}> 에 시행될 예정입니다. \n [여기를 클릭해 신청하세요](${eventRegisterChannelUrl})`,

            }
        ],
        timestamp: new Date().toISOString(),
    };

    return eventEmbed ;
}

module.exports = {createEventEmbed};