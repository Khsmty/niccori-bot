module.exports = {
	name: 'ping',
	description: 'Ping!',
	async execute(message, args) {
		const shori = await message.channel.send('非同期処理テスト〜');
	},
};