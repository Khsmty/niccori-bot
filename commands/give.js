const Discord = require('discord.js');
const Keyv = require('keyv');
const sqlite = new Keyv('sqlite://db.sqlite', { table: 'db' });

module.exports = {
  name: 'give',
  description: '指定ユーザーにEsmileを付与します。',
  async execute(message, args) {
    const givedb = (await sqlite.get(args[0])) || { nd: 0, sm: 0 };

    if (
      message.author.id == '755381028817731605' ||
      message.author.id == '823130006480748556' ||
      message.author.id == '723052392911863858'
    ) {
      try {
        if (args[2] === 'nd' || args[2] === 'ndollar') {
          var number = Number(args[1]);
          givedb.nd += number;
          sqlite.set(args[0], givedb);
          var embed = new Discord.MessageEmbed()
            .setColor('#0099FF')
            .setTitle(':white_check_mark: 成功')
            .setDescription(
              `<@!${args[0]}> さんに \`${args[1]}nd\` 付与しました。`
            )
            .setTimestamp();
          message.channel.send(embed);
          return;
        }
        var number = Number(args[1]);
        givedb.sm += number;
        sqlite.set(args[0], givedb);
        var embed = new Discord.MessageEmbed()
          .setColor('#0099FF')
          .setTitle(':white_check_mark: 成功')
          .setDescription(
            `<@!${args[0]}> さんに \`${args[1]}sm\` 付与しました。`
          )
          .setTimestamp();
        message.channel.send(embed);
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
