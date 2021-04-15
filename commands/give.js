const Discord = require('discord.js');
const Keyv = require('keyv');
const sqlite = new Keyv('sqlite://db.sqlite', { table: 'db' });

module.exports = {
	name: 'give',
	description: '指定ユーザーにEsmileを付与します。',
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

		if (
			message.author.id == '755381028817731605' ||
			message.author.id == '823130006480748556' ||
			message.author.id == '723052392911863858'
		) {
			try {
				var number = Number(args[1]);
				if (homu.sm >= number) {
					db.sm += number;
					sqlite.set(args[0], db);
					homu.sm -= number;
					sqlite.set('823130006480748556', homu);
					var embed = new Discord.MessageEmbed()
						.setColor('#0099FF')
						.setTitle(':white_check_mark: 成功')
						.setDescription(
							`<@!${args[0]}> さんに \`${args[1]}sm\` 付与しました。`
						)
						.setTimestamp();
					message.channel.send(embed);
				} else {
					var embed = new Discord.MessageEmbed()
						.setColor('#0099FF')
						.setTitle(':x: 失敗')
						.setDescription('Esmileの発行上限に達しています。')
						.setTimestamp();
					message.channel.send(embed);
					return;
				}
			} catch (error) {
				var embed = new Discord.MessageEmbed()
					.setColor('#0099FF')
					.setTitle(':x: 失敗')
					.setDescription(`\`\`\`${error}\`\`\``)
					.setTimestamp();
				message.channel.send(embed);
			}
		} else {
			var embed = new Discord.MessageEmbed()
				.setColor('#0099FF')
				.setTitle(':x: 失敗')
				.setDescription('あなたにはこのコマンドを実行する権限がありません。')
				.setTimestamp();
			message.channel.send(embed);
		}
		return;
	}
};
