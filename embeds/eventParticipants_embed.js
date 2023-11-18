
function createEventParticipantsEmbed(eventName, date, participants) {
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
                value: `<t:${Math.floor(date.getTime() / 1000)}> 에 시행될 예정입니다. \n 늦지 않도록 유의해 주세요!`,
            },
            {
                name: '참가자들 명단',
                value: participants.map(userId => `<@${userId}>`).join('\n') ?? "참가자들이 존재하지 않습니다.",
            },
        ],
        timestamp: new Date().toISOString(),
    };

    return eventEmbed ;
}

module.exports = {createEventParticipantsEmbed};