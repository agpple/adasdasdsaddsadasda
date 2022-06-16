const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "disconnect",
  description: "停止音樂並離開語音頻道",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["leave", "exit", "quit", "dc", "stop"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        `❌ | **[您必須在語音頻道中使用此命令](https://discord.gg/zDNtFvsXcC)**`
      );
    if (!player)
      return client.sendTime(
        message.channel,
        `❌ | **[現在什麼都沒有播放...](https://discord.gg/zDNtFvsXcC)**`
      );
    await client.sendTime(message.channel, `:notes: | **[斷開連線!](https://discord.gg/zDNtFvsXcC)**`);
    await message.react("✅");
    player.destroy();
  },

  SlashCommand: {
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction, args, { GuildDB }) => {
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);

      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "❌ | **您必須在語音頻道中才能使用此命令.**"
        );
      if (
        guild.me.voice.channel &&
        !guild.me.voice.channel.equals(member.voice.channel)
      )
        return client.sendTime(
          interaction,
          `❌ | **你必須在 ${guild.me.voice.channel} 使用這個命令.**`
        );

      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(
          interaction,
          "❌ | **現在什麼都沒有播放...**"
        );
      player.destroy();
      client.sendTime(interaction, `:notes: [| **斷開連線!**](https://discord.gg/zDNtFvsXcC)`);
    },
  },
};
