const Discord = require('discord.js');
const Keyv = require('keyv');
const sqlite = new Keyv('sqlite://db.sqlite', { table: 'db' });

module.exports = {
	name: 'n',
	description: '1/2ゲームがプレイできます。',
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

		if (args[0] === 'status' || args[0] === 'STATUS') {
			var embed = new Discord.MessageEmbed()
				.setColor('#0099FF')
				.setTitle(':jigsaw: 1/2ゲーム')
				.setDescription(`${message.author} さんのステータス`)
				.addFields(
					{
						name: '総賭け数',
						value: `\`${db.twowc + db.twolc}回\``,
						inline: true
					},
					{ name: '総勝ち数', value: `\`${db.twowc}回\``, inline: true },
					{ name: '総負け数', value: `\`${db.twolc}回\``, inline: true },
					{ name: '総儲け', value: `\`${db.twows}sm\``, inline: true },
					{ name: '総没収', value: `\`${db.twols}sm\``, inline: true },
					{
						name: '総収入',
						value: `\`${db.twols - db.twows}sm\``,
						inline: true
					}
				)
				.setTimestamp();
			message.channel.send(embed);
			return;
		}
		if (
			message.channel.id == '814486674909691945' ||
			message.channel.id == '829726572054839347'
		) {
			var tgsms = isNaN(args[0]);
			var tgsmp = Number(args[0]);
			if (tgsms == false) {
				if (db.sm >= tgsmp && tgsmp >= 1) {
					var tgrndm = Math.random() * (100 - 0);
					if (0 <= tgrndm && tgrndm <= 51) {
							var twosmf = tgsmp * 2;
							db.sm += twosmf;
							db.twowc += 1;
							db.twows += twosmf;
							sqlite.set(message.author.id, db);
							var embed = new Discord.MessageEmbed()
								.setColor('#0099FF')
								.setTitle(':jigsaw: 1/2ゲーム')
								.setDescription(
									`${
										message.author
									} アタリです！\n\`${twosmf}sm\` 付与されました！`
								)
								.setTimestamp()
								.setFooter(`ステータスの確認: .n status`);
							message.channel.send(embed);
					} else {
						db.sm -= tgsmp;
						db.twolc += 1;
						db.twols += tgsmp;
						sqlite.set(message.author.id, db);
						var embed = new Discord.MessageEmbed()
							.setColor('#0099FF')
							.setTitle(':jigsaw: 1/2ゲーム')
							.setDescription(
								`${message.author} ハズレです…\n\`${tgsmp}sm\` 没収されました。`
							)
							.setTimestamp()
							.setFooter(`ステータスの確認: .n status`);
						message.channel.send(embed);
					}
					return;
				} else {
					var embed = new Discord.MessageEmbed()
						.setColor('#0099FF')
						.setTitle(':x: 失敗')
						.setDescription(
							'賭けるEsmileの量は自分の所持量以下かつ1以上である必要があります。\nEsmile所持量は `.bal` で確認できます。\n初回の方は、`.setup` と送信してください。'
						)
						.setTimestamp();
					message.channel.send(embed);
					return;
				}
			}
			var embed = new Discord.MessageEmbed()
				.setColor('#0099FF')
				.setTitle(':x: 失敗')
				.setDescription(
					'賭けるEsmileの量を数字で指定してください。\n例: `.n 500`'
				)
				.setTimestamp();
			message.channel.send(embed);
		} else {
			message.delete();
			var embed = new Discord.MessageEmbed()
				.setColor('#0099FF')
				.setTitle(':x: 失敗')
				.setDescription(
					'このコマンドは以下のチャンネルでのみ実行できます:\n> <#814486674909691945>\n> <#829726572054839347>'
				)
				.setTimestamp();
			var autodelete = await message.channel.send(embed);
			autodelete.delete({ timeout: 10000 });
		}
	}
};
