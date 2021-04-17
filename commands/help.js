const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help',
	aliases: ['h'],
	description: '全てのコマンドを表示します。',
	execute(message) {
		let commands = message.client.commands.array();

		let helpEmbed = new MessageEmbed()
			.setTitle(':question: ヘルプ')
			.setColor('#0099FF');

		commands.forEach(cmd => {
			helpEmbed.addField(
				`.${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ''}`,
				`${cmd.description}`,
				true
			);
		});

		helpEmbed.setTimestamp();

		return message.channel.send(helpEmbed).catch(console.error);
	}
};
