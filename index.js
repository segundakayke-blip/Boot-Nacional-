
const { Client, GatewayIntentBits, Events } = require('discord.js');

const token = process.env.DISCORD_TOKEN;

if (!token) {
  console.error('ERRO: configure a variável DISCORD_TOKEN no Render.');
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once(Events.ClientReady, (bot) => {
  console.log(`Boot Nacional conectado como ${bot.user.tag}`);

  client.user.setPresence({
    activities: [{ name: 'Nacional Paulista' }],
    status: 'online'
  });
});

client.on(Events.GuildMemberAdd, async (member) => {
  try {
    const channel = member.guild.systemChannel;

    if (channel) {
      await channel.send(
        `Olá, ${member}! Seja bem-vindo(a) ao **${member.guild.name}**! 💙`
      );
    }
  } catch (error) {
    console.error('Erro ao enviar boas-vindas:', error);
  }
});

client.login(token).catch((error) => {
  console.error('Não foi possível conectar ao Discord:', error.message);
  process.exit(1);
});
