require('dotenv').config()
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', member => {
  if (member.user.username.toLowerCase() == 'hype message' || member.user.username.toLowerCase() == 'modmail') {
    member.guild.channels.fetch('993977500365488228').then(channel => {
      const exampleEmbed = new MessageEmbed()
        .setColor(3447003)
        .setTitle('**DiscordScamBan** Scam Bot Checker!')
        //.setURL('https://discord.js.org/')
        .setAuthor({ name: 'DiscordScamBan Scam Account Checker', iconURL: client.user.avatarURL, url: 'https://github.com/starystars67' })
        .setDescription('The following user has been suspected of being a scam bot account.')
        //.setThumbnail('https://i.imgur.com/AfFp7pu.png')
        .addFields(
          { name: "Name", value: member.user.username, inline: true },
          { name: "ID", value: member.user.id, inline: true }
        )
        //.addField('Inline field title', 'Some value here', true)
        //.setImage('https://i.imgur.com/AfFp7pu.png')
        .setTimestamp()
        .setFooter({ text: '© Starystars67 - 2022', iconURL: client.user.avatarURL });

      channel.send({ embeds: [exampleEmbed] });

      // ban a guild member
      const banEmbed = new MessageEmbed()
        .setColor(3447003)
        .setTitle('**DiscordScamBan** Scam Bot Checker!')
        //.setURL('https://discord.js.org/')
        .setAuthor({ name: 'DiscordScamBan Scam Account Checker', iconURL: client.user.avatarURL, url: 'https://github.com/starystars67' })
        .setDescription('The following user has been banned from the server.')
        //.setThumbnail('https://i.imgur.com/AfFp7pu.png')
        .addFields(
          { name: "Name", value: member.user.username, inline: true },
          { name: "ID", value: member.user.id, inline: true }
        )
        //.addField('Inline field title', 'Some value here', true)
        //.setImage('https://i.imgur.com/AfFp7pu.png')
        .setTimestamp()
        .setFooter({ text: '© Starystars67 - 2022', iconURL: client.user.avatarURL });

      
      member.ban({ deleteMessageDays: 7, reason: 'DiscordScamBan - Suspected scam account based on user name of hype message or modmail.' })
        .then(() => {
          channel.send({ embeds: [banEmbed] })
          channel.send(`<@${member.user.id}>`)
        })
        .catch(console.error);
      })
    .catch(console.error);
  }
});

client.login(process.env.TOKEN);