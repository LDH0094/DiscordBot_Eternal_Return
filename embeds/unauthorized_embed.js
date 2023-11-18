const unauthorizedEmbed = {
	color: 0xff0000,
	title: '내전 관리자 권한 에러',
	description: '다음 명령어는 내전 관리자에게 있습니다.',
	thumbnail: {
		url: 'https://i.pinimg.com/736x/1e/ad/13/1ead137d6bc3277707c29a9524e888b7.jpg',
	},
	timestamp: new Date().toISOString(),
};

module.exports = {unauthorizedEmbed};