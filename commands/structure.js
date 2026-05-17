const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('structure')
        .setDescription('View the organizational structure of DemocracyCraft'),
    async execute(interaction) {
        const structureEmbed = new EmbedBuilder()
            .setColor('#3F51B5')
            .setTitle('🏛️ DemocracyCraft Organizational Structure')
            .setDescription('Complete hierarchy and department breakdown')
            .addFields(
                { 
                    name: '👑 Executive Level', 
                    value: '└─ CEO\n   ├─ CFO (Finance)\n   ├─ COO (Operations)\n   └─ CTO (Technology)', 
                    inline: true 
                },
                { 
                    name: '📊 Management Level', 
                    value: '├─ HR Department\n│  └─ HR Manager\n├─ Finance Department\n│  └─ Finance Manager\n├─ Operations Department\n│  └─ Operations Manager\n└─ IT Department\n   └─ IT Manager', 
                    inline: true 
                },
                { 
                    name: '👷 Staff Level', 
                    value: '├─ Supervisors (4)\n├─ Senior Workers (8)\n├─ Workers (15)\n└─ Junior Workers (10)', 
                    inline: true 
                }
            )
            .addFields(
                { name: 'Total Departments', value: '4', inline: true },
                { name: 'Total Positions', value: '47', inline: true },
                { name: 'Management Ratio', value: '1:10', inline: true }
            )
            .setFooter({ text: 'DemocracyCraft Organization' })
            .setTimestamp();

        await interaction.reply({
            embeds: [structureEmbed]
        });

        console.log(`Structure viewed by: ${interaction.user.tag}`);
    },
};
