const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "youtube",
  description: "開始 YouTube Together 會話",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["yt"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {require("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **您必須在語音頻道中才能播放某些內容!**"
      );
    if (
      !message.member.voice.channel
        .permissionsFor(message.guild.me)
        .has("CREATE_INSTANT_INVITE")
    )
      return client.sendTime(
        message.channel,
        "❌ | **Bot 沒有創建邀請權限**"
      );

    let Invite = await message.member.voice.channel.activityInvite(
      "880218394199220334"
    ); //Made using discordjs-activity package
    let embed = new MessageEmbed()
      .setAuthor(
        "YouTube Together",
        "https://cdn.discordapp.com/emojis/749289646097432667.png?v=1"
      )
      .setColor("#FF0000").setDescription(`
使用 **YouTube Together**，您可以與您的朋友在語音頻道中觀看 YouTube。 點擊*一起加入 YouTube* 加入！

__**[一起加入 YouTube](https://discord.com/invite/${Invite.code})**__

⚠ **注意:** 這僅適用於桌面
`);
    message.channel.send(embed);
  },
  SlashCommand: {
    options: [],
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
          "❌ | 您必須在語音頻道中才能使用此命令."
        );
      if (
        !member.voice.channel
          .permissionsFor(guild.me)
          .has("CREATE_INSTANT_INVITE")
      )
        return client.sendTime(
          interaction,
          "❌ | **Bot 沒有創建邀請權限**"
        );

      let Invite = await member.voice.channel.activityInvite(
        "482206952030601227"
      ); //Made using discordjs-activity package
      let embed = new MessageEmbed()
        .setAuthor(
          "| YouTube Together",
          "https://cdn.discordapp.com/emojis/749289646097432667.png?v=1"
        )
        .setColor("#FF0000").setDescription(`
使用 **YouTube Together**，您可以與您的朋友在語音頻道中觀看 YouTube。 點擊*一起加入 YouTube* 加入！

__**[一起加入 YouTube](https://discord.com/invite/${Invite.code})**__

⚠ **注意:** 這僅適用於桌面
`);
      interaction.send(embed.toJSON());
    },
  },
};
