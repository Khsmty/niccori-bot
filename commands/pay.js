const Discord = require('discord.js');
const Keyv = require('keyv');
const sqlite = new Keyv('sqlite://db.sqlite', { table: 'db' });

module.exports = {
	name: 'pay',
	description: 'Esmileを送ることができます。',
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

		if (message.mentions.users.size) {
			if (args[1] >= 1) {
				var paymu = message.mentions.users.first();
				var paymd = (await sqlite.get(paymu.id)) || { sm: 0 };
				var paysm = Number(args[1]);
				if (db.sm >= paysm && paysm >= 1) {
					db.sm -= paysm;
					sqlite.set(message.author.id, db);
					paymd.sm += paysm;
					sqlite.set(paymu.id, paymd);
					var embed = new Discord.MessageEmbed()
						.setColor('#0099FF')
						.setTitle(':white_check_mark: 成功')
						.setDescription(
							`${message.author} さんから <@!${
								paymu.id
							}> さんに \`${paysm}sm\` 送金しました。`
						)
						.setTimestamp();
					message.channel.send(embed);
					return;
				} else {
					var embed = new Discord.MessageEmbed()
						.setColor('#0099FF')
						.setTitle(':x: 失敗')
						.setDescription(
							'送るEsmileの量は自分の所持量以下かつ1以上である必要があります。\nEsmile所持量は `.bal` で確認できます。\n初回の方は、`.setup` と送信してください。'
						)
						.setTimestamp();
					message.channel.send(embed);
					return;
				}
			}
		}
		var embed = new Discord.MessageEmbed()
			.setColor('#0099FF')
			.setTitle(':x: 失敗')
			.setDescription(
				'Esmileを送る相手と量を指定してください。\n例: `.pay @メンション 500`'
			)
			.setTimestamp();
		message.channel.send(embed);
	}
};
