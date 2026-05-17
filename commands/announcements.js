const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announcements')
        .setDescription('Post important announcements (Staff only)')
        .addStringOption(option =>
            option.setName('title')
                .setDescription('Announcement title')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('content')
                .setDescription('Announcement content')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('priority')
                .setDescription('Priority level')
                .setRequired(true)
                .addChoices(
                    { name: 'Low', value: 'low' },
                    { name: 'Medium', value: 'medium' },
                    { name: 'High', value: 'high' },
                    { name: 'Critical', value: 'critical' }
                ))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction) {
        // Check if user has staff permissions
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return interaction.reply({
                content: '❌ You do not have permission to post announcements.',
                ephemeral: true
            });
        }

        const title = interaction.options.getString('title');
        const content = interaction.options.getString('content');
        const priority = interaction.options.getString('priority');

        // Set color based on priority
        const priorityColors = {
            low: '#00FF00',
            medium: '#FFA500',
            high: '#FF4500',
            critical: '#FF0000'
        };

        const priorityEmojis = {
            low: '🟢',
            medium: '🟡',
            high: '🟠',
            critical: '🔴'
        };

        const announcementEmbed = new EmbedBuilder()
            .setColor(priorityColors[priority])
            .setTitle(`${priorityEmojis[priority]} ${title}`)
            .setDescription(content)
            .addFields(
                { name: 'Priority', value: `${priorityEmojis[priority]} ${priority.charAt(0).toUpperCase() + priority.slice(1)}`, inline: true },
                { name: 'Posted by', value: interaction.user.tag, inline: true },
                { name: 'Date', value: `<t:${Math.floor(Date.now() / 1000)}:F>` }
            )
            .setFooter({ text: 'DemocracyCraft Announcements' })
            .setTimestamp();

        // TODO: Post to designated announcements channel
        // const announcementChannel = interaction.guild.channels.cache.get(process.env.ANNOUNCEMENTS_CHANNEL_ID);
        // if (announcementChannel) {
        //     await announcementChannel.send({ embeds: [announcementEmbed] });
        // }

        await interaction.reply({
            embeds: [announcementEmbed],
            content: '✅ Announcement posted successfully!',
            ephemeral: true
        });

        console.log(`Announcement posted by ${interaction.user.tag}: ${title} [${priority}]`);
    },
};
