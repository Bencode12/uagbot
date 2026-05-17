const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wages')
        .setDescription('List wages of all employees'),
    async execute(interaction) {
        // TODO: Fetch wage data from database
        
        const wagesEmbed = new EmbedBuilder()
            .setColor('#FF9800')
            .setTitle('💰 Employee Wages')
            .setDescription('Current wage structure for all employees')
            .addFields(
                { name: 'Management', value: '• CEO: $500/hour\n• CFO: $450/hour\n• COO: $425/hour\n• CTO: $400/hour', inline: false },
                { name: 'Staff', value: '• Manager: $250/hour\n• Supervisor: $200/hour', inline: false },
                { name: 'Workers', value: '• Senior Worker: $150/hour\n• Worker: $125/hour\n• Junior Worker: $100/hour', inline: false }
            )
            .addFields(
                { name: 'Average Wage', value: '$237.50/hour', inline: true },
                { name: 'Total Payroll', value: '$2,850/hour', inline: true },
                { name: 'Last Updated', value: '<t:' + Math.floor(Date.now() / 1000) + ':R>', inline: true }
            )
            .setFooter({ text: 'DemocracyCraft Payroll System' })
            .setTimestamp();

        await interaction.reply({
            embeds: [wagesEmbed]
        });

        console.log(`Wage information requested by: ${interaction.user.tag}`);
    },
};
