const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

client.on('ready', () => {
  console.log(`Bot zalogowany jako ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith('!aktywność')) {
    // Pobiera cały tekst wpisany po słowie !aktywność
    const tresc = message.content.slice(10).trim();

    if (!tresc) {
      return message.reply('Podaj treść aktywności! Przykład: `!aktywność Mój cel | Moja notatka`');
    }

    // Dzieli tekst na Cel i Notatkę za pomocą znaku |
    const części = tresc.split('|');
    const cel = części[0] ? części[0].trim() : 'Brak';
    const notatka = części[1] ? części[1].trim() : 'Brak';

    const embed = new EmbedBuilder()
      .setTitle('📊 Raport Aktywności')
      .setColor('#0099ff')
      .addFields(
        { name: '🧑 Kto:', value: `<@${message.author.id}>`, inline: true },
        { name: '✅ Cel:', value: cel, inline: true },
        { name: 'ℹ️ Notatka:', value: notatka }
      )
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
});

client.login('MTU0MDA3NjA1NzAxNTg3NzcyNA.GvX_JR.Alv9HumiEaVJ6R8-EGoDBCDfnkX6Pte_eyeYTE');
