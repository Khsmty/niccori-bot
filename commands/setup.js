const Discord = require('discord.js');
const Keyv = require('keyv');
const sqlite = new Keyv('sqlite://db.sqlite', { table: 'db' });

module.exports = {
	name: 'setup',
	description: 'Esmileのセットアップを行います。',
	async execute(message, args) {
		const db = (await sqlite.get(message.author.id)) || {
			nd: 0,
			sm: 0,
			join: 0,
			fishga: 0,
			fishco: 0,
			fishun: 0,
			fishra: 0,
			twowc: 0,
			twolc: 0,
			twows: 0,
			twols: 0
		};
		const homu = (await sqlite.get('823130006480748556')) || { sm: 0 };

		if (db.sm == 0 && db.join == 0) {
			db.join += 1;
			db.sm += 10000;
			sqlite.set(message.author.id, db);
			homu.sm -= 10000;
			sqlite.set('823130006480748556', homu);
			var embed = new Discord.MessageEmbed()
				.setColor('#0099FF')
				.setTitle(':white_check_mark: 成功')
				.setDescription(
					'セットアップが完了しました。\n`.bal` でご確認ください。'
				)
				.setTimestamp();
			message.channel.send(embed);
		} else {
			var embed = new Discord.MessageEmbed()
				.setColor('#F2E700')
				.setTitle(':x: 失敗')
				.setDescription(
					'あなたはセットアップ済みです。\n残高は `.bal` で確認できます。'
				)
				.setTimestamp();
			message.channel.send(embed);
		}
	}
};
