const Discord = require('discord.js');
const Keyv = require('keyv');
const sqlite = new Keyv('sqlite://db.sqlite', { table: 'db' });

module.exports = {
	name: 'fish',
	aliases: ['f'],
	description: '魚を釣ることができます。',
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

		if (args[0] === 'status' || args[0] === 'STATUS' || args[0] === 'Status') {
			var fishs0 = db.fishga + db.fishco + db.fishun + db.fishra;
			var fishs1 =
				db.fishga * 6 +
				db.fishco * 12 +
				db.fishun * 20 +
				db.fishra * 500 -
				fishs0 * 10;
			var embed = new Discord.MessageEmbed()
				.setColor('#0099FF')
				.setTitle(':fishing_pole_and_fish: 魚釣り')
				.setDescription(`${message.author} のステータス`)
				.addFields(
					{
						name: 'ゴミ(6sm)',
						value: `\`${db.fishga}個(${db.fishga * 6}sm)\``,
						inline: true
					},
					{
						name: 'コモン(12sm)',
						value: `\`${db.fishco}匹(${db.fishco * 12}sm)\``,
						inline: true
					},
					{
						name: 'アンコモン(20sm)',
						value: `\`${db.fishun}匹(${db.fishun * 20}sm)\``,
						inline: true
					},
					{
						name: 'レア(500sm)',
						value: `\`${db.fishra}匹(${db.fishra * 500}sm)\``,
						inline: true
					},
					{ name: '総釣り数', value: `\`${fishs0}回\``, inline: true },
					{ name: '総収入', value: `\`${fishs1}sm\``, inline: true }
				)
				.setTimestamp();
			message.channel.send(embed);
			return;
		}
		if (db.sm >= 10 && message.channel.id == '817601057952759818') {
			var fishr = Math.random() * (100 - 0);
			if (0 <= fishr && fishr < 30) {
				db.sm -= 4;
				db.fishga += 1;
				sqlite.set(message.author.id, db);
				homu.sm += 4;
				sqlite.set('823130006480748556', homu);
				var embed = new Discord.MessageEmbed()
					.setColor('#0099FF')
					.setTitle(':fishing_pole_and_fish: 魚釣り')
					.setDescription(
						`${message.author} が :wastebasket: **ゴミ** を釣った！`
					)
					.addFields(
						{ name: '支払額', value: '`10sm`', inline: true },
						{ name: '獲得額', value: '`6sm`', inline: true },
						{ name: '結果', value: '`-4sm`', inline: true }
					)
					.setTimestamp()
					.setFooter(`ステータスの確認: .fish status`);
				message.channel.send(embed);
			} else if (30 <= fishr && fishr < 70 && homu.sm >= 2) {
				db.sm += 2;
				db.fishco += 1;
				sqlite.set(message.author.id, db);
				homu.sm -= 2;
				sqlite.set('823130006480748556', homu);
				var embed = new Discord.MessageEmbed()
					.setColor('#0099FF')
					.setTitle(':fishing_pole_and_fish: 魚釣り')
					.setDescription(`${message.author} が :fish: **一般種** を釣った！`)
					.addFields(
						{ name: '支払額', value: '`10sm`', inline: true },
						{ name: '獲得額', value: '`12sm`', inline: true },
						{ name: '結果', value: '`+2sm`', inline: true }
					)
					.setTimestamp()
					.setFooter(`ステータスの確認: .fish status`);
				message.channel.send(embed);
			} else if (70 <= fishr && fishr < 90 && homu.sm >= 10) {
				db.sm += 10;
				db.fishun += 1;
				sqlite.set(message.author.id, db);
				homu.sm -= 10;
				sqlite.set('823130006480748556', homu);
				var embed = new Discord.MessageEmbed()
					.setColor('#0099FF')
					.setTitle(':fishing_pole_and_fish: 魚釣り')
					.setDescription(
						`${message.author} が :tropical_fish: **希少種** を釣った！`
					)
					.addFields(
						{ name: '支払額', value: '`10sm`', inline: true },
						{ name: '獲得額', value: '`20sm`', inline: true },
						{ name: '結果', value: '`+10sm`', inline: true }
					)
					.setTimestamp()
					.setFooter(`ステータスの確認: .fish status`);
				message.channel.send(embed);
			} else if (homu.sm >= 490) {
				db.sm += 490;
				db.fishra += 1;
				sqlite.set(message.author.id, db);
				homu.sm -= 490;
				sqlite.set('823130006480748556', homu);
				var embed = new Discord.MessageEmbed()
					.setColor('#0099FF')
					.setTitle(':fishing_pole_and_fish: 魚釣り')
					.setDescription(`${message.author} が :dolphin: **レア** を釣った！`)
					.addFields(
						{ name: '支払額', value: '`10sm`', inline: true },
						{ name: '獲得額', value: '`500sm`', inline: true },
						{ name: '結果', value: '`+490sm`', inline: true }
					)
					.setTimestamp()
					.setFooter(`ステータスの確認: .fish status`);
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
			return;
		} else if (db.sm <= 10) {
			var embed = new Discord.MessageEmbed()
				.setColor('#0099FF')
				.setTitle(':x: 失敗')
				.setDescription(
					'Esmileが不足しています。\n釣りをするには、最低でも `10sm` 必要です。\n初回の方は、`.setup` と送信してください。'
				)
				.setTimestamp();
			message.channel.send(embed);
		} else {
			message.delete();
			var embed = new Discord.MessageEmbed()
				.setColor('#0099FF')
				.setTitle(':x: 失敗')
				.setDescription(
					'このコマンドは以下のチャンネルでのみ実行できます:\n> <#817601057952759818>'
				)
				.setTimestamp();
			var autodelete = await message.channel.send(embed);
			autodelete.delete({ timeout: 10000 });
		}
	}
};
