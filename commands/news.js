const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('news')
        .setDescription('Post company news (Staff only)')
        .addStringOption(option =>
            option.setName('title')
                .setDescription('News title')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('content')
                .setDescription('News content')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction) {
        // Check if user has staff permissions
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return interaction.reply({
                content: '❌ You do not have permission to post news.',
                ephemeral: true
            });
        }

        const title = interaction.options.getString('title');
        const content = interaction.options.getString('content');

        const newsEmbed = new EmbedBuilder()
            .setColor('#FFD700')
            .setTitle(`📰 ${title}`)
            .setDescription(content)
            .addFields(
                { name: 'Posted by', value: interaction.user.tag },
                { name: 'Date', value: `<t:${Math.floor(Date.now() / 1000)}:F>` }
            )
            .setFooter({ text: 'DemocracyCraft News' })
            .setTimestamp();

        // TODO: Post to designated news channel
        // const newsChannel = interaction.guild.channels.cache.get(process.env.NEWS_CHANNEL_ID);
        // if (newsChannel) {
        //     await newsChannel.send({ embeds: [newsEmbed] });
        // }

        await interaction.reply({
            embeds: [newsEmbed],
            content: '✅ News posted successfully!',
            ephemeral: true
        });

        console.log(`News posted by ${interaction.user.tag}: ${title}`);
    },
};
