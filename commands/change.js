const Discord = require('discord.js');
const Keyv = require('keyv');
const sqlite = new Keyv('sqlite://db.sqlite', { table: 'db' });

module.exports = {
	name: 'change',
	description: 'NdollarとEsmileの両替ができます。',
	async execute(message, args) {
		const db = (await sqlite.get(message.author.id)) || { nd: 0, sm: 0 };

    var channum = Number(args[1]);
    if (channum >= 1) {
		  if (args[0] == 'nd' || args[0] == 'ND') {
        var channd = channum * 1000000000000;
        if (db.sm >= channd) {
          db.sm -= channd;
          db.nd += channum;
          sqlite.set(message.author.id, db);
          var embed = new Discord.MessageEmbed()
            .setColor('#0099FF')
            .setTitle(':white_check_mark: 成功')
            .setDescription(
              `両替しました。\n> \`${channd}sm\` → \`${channum}nd\``
            )
            .setTimestamp();
          message.channel.send(embed);
          return;
        } else {
          var embed = new Discord.MessageEmbed()
		  	  	.setColor('#0099FF')
		  	  	.setTitle(':x: 失敗')
		  	  	.setDescription(`所持Esmile量が不足しています。\n\`${args[1]}nd\` へ両替するには、最低でも \`${channd}sm\` 必要です。`)
		  	  	.setTimestamp();
		  	  message.channel.send(embed);
		  	  return;
        }
      } else if (args[0] == 'sm' || args[0] == 'SM') {
        var chansm = channum / 1000000000000;
        if (db.nd >= chansm) {
          db.nd -= chansm;
          db.sm += channum;
          sqlite.set(message.author.id, db);
          var embed = new Discord.MessageEmbed()
            .setColor('#0099FF')
            .setTitle(':white_check_mark: 成功')
            .setDescription(
              `両替しました。\n> \`${chansm}nd\` → \`${channum}sm\``
            )
            .setTimestamp();
          message.channel.send(embed);
        } else {
          var embed = new Discord.MessageEmbed()
		  	  	.setColor('#0099FF')
		  	  	.setTitle(':x: 失敗')
		  	  	.setDescription(`所持Ndoller量が不足しています。\n\`${args[1]}sm\` へ両替するには、最低でも \`${channd}nd\` 必要です。`)
		  	  	.setTimestamp();
		  	  message.channel.send(embed);
        }
      } else {
        var embed = new Discord.MessageEmbed()
		  		.setColor('#0099FF')
		  		.setTitle(':x: 失敗')
		  		.setDescription('両替先の通貨を指定してください。\n例: `.change nd 500`')
		  		.setTimestamp();
		  	message.channel.send(embed);
      }
    } else {
      var embed = new Discord.MessageEmbed()
				.setColor('#0099FF')
				.setTitle(':x: 失敗')
				.setDescription(
					'両替量は1以上である必要があります。'
				)
				.setTimestamp();
			message.channel.send(embed);
    }
	}
};
