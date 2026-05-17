const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get a list of all available commands and server navigation help'),
    async execute(interaction) {
        const helpEmbed = new EmbedBuilder()
            .setColor('#00BFFF')
            .setTitle('📚 DemocracyCraft Bot - Help Center')
            .setDescription('Welcome to DemocracyCraft! Here are all available commands:')
            .addFields(
                { 
                    name: '📝 Applications & HR', 
                    value: '`/application` - Start job application process\n`/employees` - View all employees\n`/wages` - Check hourly wages\n`/salaries` - Check annual salaries', 
                    inline: false 
                },
                { 
                    name: '📢 Communications', 
                    value: '`/news` - Post company news (Staff)\n`/announcements` - Post announcements (Staff)', 
                    inline: false 
                },
                { 
                    name: '💼 Business Operations', 
                    value: '`/clock` - Clock in/out for work\n`/structure` - View org structure\n`/realty` - Check plot ownership\n`/econ-report` - Market analysis', 
                    inline: false 
                },
                { 
                    name: '💬 Social Features', 
                    value: '`/private-chat` - Create 1-on-1 chat with someone', 
                    inline: false 
                },
                { 
                    name: '📋 Information', 
                    value: '`/services` - View company services\n`/rules` - Read server rules\n`/help` - Show this help menu', 
                    inline: false 
                }
            )
            .addFields(
                { name: 'Need More Help?', value: 'Contact an administrator or check the pinned messages in relevant channels.', inline: false },
                { name: 'Bot Version', value: 'v1.0.0 (Template)', inline: true },
                { name: 'Server', value: 'DemocracyCraft', inline: true }
            )
            .setFooter({ text: 'DemocracyCraft Bot - Your Server Assistant' })
            .setTimestamp();

        await interaction.reply({
            embeds: [helpEmbed],
            ephemeral: true
        });

        console.log(`Help requested by: ${interaction.user.tag}`);
    },
};
