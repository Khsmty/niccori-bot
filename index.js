const http = require('http');
http
	.createServer(function(req, res) {
		res.write('OK');
		res.end();
	})
	.listen(8080);

const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs
	.readdirSync('./commands')
	.filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const prefix = '.';

client.on('ready', message => {
	console.log('botが起動しました');
});

const Keyv = require('keyv');
const sqlite = new Keyv('sqlite://db.sqlite', { table: 'db' });

client.on('guildMemberAdd', async member => {
	const gjdb = (await sqlite.get(member.id)) || {
		sm: 0,
		join: 0
	};

	if (gjdb.sm == 0 && gjdb.join == 0) {
		gjdb.join += 1;
		gjdb.sm += 10000;
		sqlite.set(member.id, smj);
	}
});

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/);
	const commandName = args.shift().toLowerCase();

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

	const command =
		client.commands.get(commandName) ||
		client.commands.find(
			cmd => cmd.aliases && cmd.aliases.includes(commandName)
		);

	if (!command) return;

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.on('message', async message => {
	if (message.author.bot) {
		if (message.author.id == '159985870458322944') {
			if (message.content.startsWith('^levelup')) {
				message.delete();
				const lvupdata = message.content.split(',');
				message.channel.send(
					`<@!${lvupdata[1]}>さんが**Lv.${
						lvupdata[2]
					}**になりました\nおめでとうございます！`
				);
				if (lvupdata[2] === '3') {
					var lv3mem = await message.guild.members.fetch(lvupdata[1]);
					lv3mem.roles.add('823579630782906419');
					message.channel.send(
						'Lv.3に到達したので、宣伝が利用可能になりました！'
					);
				}
			}
		}
		if (message.author.id == '302050872383242240') {
			if (
				message.embeds[0].color == '2406327' &&
				message.embeds[0].url == 'https://disboard.org/' &&
				(message.embeds[0].description.match(/表示順をアップしたよ/) ||
					message.embeds[0].description.match(/Bump done/) ||
					message.embeds[0].description.match(/Bump effectué/) ||
					message.embeds[0].description.match(/Bump fatto/) ||
					message.embeds[0].description.match(/Podbito serwer/))
			) {
				const noti = await message.channel.send({
					embed: {
						title: 'Bumpが実行されました！',
						description: '再度実行可能になったらお知らせします。',
						color: 7506394
					}
				});
				noti.delete({ timeout: 60000 });
				setTimeout(() => {
					message.channel.send({
						embed: {
							title: 'Bumpできます！',
							description: 'コマンド`!d bump`を送信できます。',
							color: 7506394
						}
					});
				}, 7200000);
			} else if (
				message.embeds[0].color == '15420513' &&
				message.embeds[0].url == 'https://disboard.org/' &&
				(message.embeds[0].description.match(
					/このサーバーを上げられるようになるまで/
				) ||
					message.embeds[0].description.match(
						/あなたがサーバーを上げられるようになるまで/
					))
			) {
				var splcontent_a = message.embeds[0].description.split('と');
				console.log(splcontent_a[1]);
				var splcontent_b = splcontent_a[1].split('分');
				console.log(splcontent_b[0]);
				var waittime_bump = splcontent_b[0];

				message.channel.send({
					embed: {
						title: 'Bumpに失敗したようです…',
						description: waittime_bump + '分後にもう一度お試しください。',
						color: 7506394
					}
				});
			}
		}
		if (message.author.id == '761562078095867916') {
			if (message.embeds[0].description.match(/をアップしたよ/)) {
				const unoti = await message.channel.send({
					embed: {
						title: 'Upが実行されました！',
						description: '再度実行可能になったらお知らせします。',
						color: 7506394
					}
				});
				unoti.delete({ timeout: 60000 });
				setTimeout(() => {
					message.channel.send({
						embed: {
							title: 'Upできます！',
							description: 'コマンド`/dissoku up!`を送信できます。',
							color: 7506394
						}
					});
				}, 3600000);
			} else if (
				message.embeds[0].title ==
					'ディスコード速報 | Discordサーバー・友達募集掲示板' &&
				message.embeds[0].url == 'https://dissoku.net/' &&
				message.embeds[0].description.match(/間隔をあけてください/)
			) {
				var splcontent_a = message.embeds[0].description.split('(');
				console.log(splcontent_a[1]);
				var splcontent_b = splcontent_a[1].split('分');
				console.log(splcontent_b[0]);
				var waittime_up = splcontent_b[0];

				message.channel.send({
					embed: {
						title: 'Upに失敗したようです…',
						description: waittime_up + '分後にもう一度お試しください。',
						color: 7506394
					}
				});
			}
		}
	}
});

client.login(process.env.TOKEN);
