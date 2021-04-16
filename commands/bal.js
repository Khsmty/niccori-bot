const Discord = require('discord.js');
const Keyv = require('keyv');
const sqlite = new Keyv('sqlite://db.sqlite', { table: 'db' });

module.exports = {
	name: 'bal',
	aliases: ['wallet'],
	description: '所持金を確認できます。',
	async execute(message, args) {
		const db = (await sqlite.get(message.author.id)) || { nd: 0, sm: 0 };

		if (message.mentions.users.size) {
			var balmu = message.mentions.users.first();
			var baldb = (await sqlite.get(balmu.id)) || { sm: 0 };
			var embed = new Discord.MessageEmbed()
				.setColor('#0099FF')
				.setTitle(':moneybag: 所持金')
				.setDescription(
					`<@!${balmu.id}>さんの所持金:\n> Esmile: \`${
						baldb.sm
					}sm\`\n> Ndollar: \`${baldb.nd}nd\``
				)
				.setTimestamp();
			message.channel.send(embed);
			return;
		}
		var embed = new Discord.MessageEmbed()
			.setColor('#0099FF')
			.setTitle(':moneybag: 所持金')
			.setDescription(
				`あなたの所持金:\n> Esmile: \`${db.sm}sm\`\n> Ndollar: \`${db.nd}nd\``
			)
			.setTimestamp();
		message.channel.send(embed);
	}
};
